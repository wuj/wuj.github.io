// Homepage dot field. A grid of dots bends around the pointer, ripples outward
// from a click, and zooms around the pointer on scroll, easing back to normal
// a few seconds after scrolling stops. Dots behind visible text are dimmed so
// the words stay readable.
(function () {
  var cv = document.getElementById("field");
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext("2d");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var noHover = window.matchMedia("(hover: none)");
  var GAP = 28, PADX = 10, PADY = 6, FEATHER = 22;
  var W = 0, H = 0, dpr = 1, mx = -9999, my = -9999, tmx = -9999, tmy = -9999, t0 = performance.now();
  var quietBoxes = [], ripples = [];
  var view = { z: 1, ox: 0, oy: 0 }, lastWheel = 0;

  var brandWrap = document.querySelector(".brand-wrap");
  var brandLink = document.querySelector(".brand");
  var quoteEl = document.querySelector(".quote");

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function quoteShown() {
    return noHover.matches || (brandWrap && brandWrap.matches(":hover")) || (brandLink && brandLink.matches(":focus-visible"));
  }

  function measure() {
    var old = quietBoxes;
    quietBoxes = [];
    Array.prototype.forEach.call(document.querySelectorAll(".bio p, .brand, .quote, nav.links a"), function (el) {
      var b = el.getBoundingClientRect();
      if (!b.width || !b.height) return;
      var target = el === quoteEl ? (quoteShown() ? 1 : 0) : 1;
      var prev = old.filter(function (o) { return o.el === el; })[0];
      quietBoxes.push({ el: el, l: b.left - PADX, t: b.top - PADY, r: b.right + PADX, b: b.bottom + PADY, target: target, s: prev ? prev.s : target });
    });
  }
  function updateQuote() {
    var on = quoteShown() ? 1 : 0;
    quietBoxes.forEach(function (q) { if (q.el === quoteEl) { q.target = on; if (reduce) q.s = on; } });
    if (reduce) draw(performance.now());
  }
  if (brandWrap) {
    brandWrap.addEventListener("mouseenter", updateQuote);
    brandWrap.addEventListener("mouseleave", updateQuote);
  }
  if (brandLink) {
    brandLink.addEventListener("focus", function () { setTimeout(updateQuote, 0); });
    brandLink.addEventListener("blur", function () { setTimeout(updateQuote, 0); });
  }

  function quiet(x, y) {
    var f = 1;
    for (var i = 0; i < quietBoxes.length; i++) {
      var q = quietBoxes[i];
      if (q.s < 0.01) continue;
      var dx = Math.max(q.l - x, 0, x - q.r), dy = Math.max(q.t - y, 0, y - q.b);
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d >= FEATHER) continue;
      var e = 1 - d / FEATHER; e = e * e * (3 - 2 * e);
      f = Math.min(f, 1 - 0.7 * q.s * e);
    }
    return f;
  }

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    measure();
    if (reduce) draw(performance.now());
  }

  function step(now) {
    if (now - lastWheel > 2500 && Math.abs(view.z - 1) > 0.001) {
      var nz = view.z + (1 - view.z) * 0.04;
      view.ox = W / 2 - (W / 2 - view.ox) * (nz / view.z);
      view.oy = H / 2 - (H / 2 - view.oy) * (nz / view.z);
      view.z = nz;
    }
    for (var i = 0; i < quietBoxes.length; i++) { var q = quietBoxes[i]; q.s += (q.target - q.s) * 0.14; }
  }

  function draw(now) {
    if (!reduce) step(now);
    var t = (now - t0) / 1000, z = view.z, g = GAP * z;
    var r = Math.min(W, H) * 0.2;
    var baseR = clamp(1.1 * Math.sqrt(z), 0.8, 2.2);
    mx += (tmx - mx) * 0.12; my += (tmy - my) * 0.12;
    ripples = ripples.filter(function (p) { return now - p.t < 2600; });
    ctx.clearRect(0, 0, W, H);
    var sx0 = ((view.ox % g) + g) % g - g, sy0 = ((view.oy % g) + g) % g - g;
    for (var y = sy0; y < H + g; y += g) {
      for (var x = sx0; x < W + g; x += g) {
        var px = x, py = y;
        if (!reduce) {
          var wx = (x - view.ox) / z, wy = (y - view.oy) / z;
          var wob = Math.sin(wx * 0.011 + t * 0.5) * Math.cos(wy * 0.013 + t * 0.35) * 2.6;
          px += wob; py += wob;
        }
        var dx = px - mx, dy = py - my;
        var k = Math.exp(-(dx * dx + dy * dy) / (2 * r * r));
        px += dx * k * 0.5; py += dy * k * 0.5;
        var glow = k;
        if (!reduce) {
          for (var i = 0; i < ripples.length; i++) {
            var rp = ripples[i], age = (now - rp.t) / 1000;
            var ex = px - rp.x, ey = py - rp.y, d = Math.sqrt(ex * ex + ey * ey) || 1;
            var front = age * 520, w = Math.exp(-((d - front) * (d - front)) / 1800) * (1 - age / 2.6);
            px += ex / d * w * 9; py += ey / d * w * 9; glow += w * 0.7;
          }
        }
        if (glow > 1) glow = 1;
        var a = (0.15 + glow * 0.6) * quiet(px, py);
        ctx.fillStyle = "rgba(141,160,190," + a.toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(px, py, baseR + glow * 1.6, 0, 6.2832); ctx.fill();
      }
    }
    if (!reduce) requestAnimationFrame(draw);
  }

  window.addEventListener("pointermove", function (e) {
    tmx = e.clientX; tmy = e.clientY;
    if (reduce) { mx = tmx; my = tmy; draw(performance.now()); }
  });
  document.documentElement.addEventListener("pointerleave", function () { tmx = tmy = -9999; });
  window.addEventListener("pointerdown", function (e) {
    if (reduce || e.target.closest("a")) return;
    ripples.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    if (ripples.length > 4) ripples.shift();
  });
  window.addEventListener("wheel", function (e) {
    e.preventDefault();
    var d = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? H : 1);
    if (e.ctrlKey) d *= 3;
    lastWheel = performance.now();
    var nz = clamp(view.z * Math.exp(-d * 0.0015), 0.6, 3);
    view.ox = e.clientX - (e.clientX - view.ox) * (nz / view.z);
    view.oy = e.clientY - (e.clientY - view.oy) * (nz / view.z);
    view.z = nz;
    if (reduce) draw(performance.now());
  }, { passive: false });
  window.addEventListener("resize", size);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

  size();
  if (!reduce) requestAnimationFrame(draw);
})();
