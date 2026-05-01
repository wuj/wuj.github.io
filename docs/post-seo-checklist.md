---
layout: page
title: SEO checklist for posts
---

How to write a post that gets the most out of `jekyll-seo-tag`,
`jekyll-feed`, and `jekyll-sitemap` (already enabled in `_config.yml`).

## TL;DR

For every post:

- Write an explicit `title`, `description`, and (when possible) `image`
  in the front matter.
- Start the body at `h2` and never skip heading levels.
- Add `alt`, `width`, `height`, `loading="lazy"` to every image.
- Use `{% raw %}{% post_url %}{% endraw %}` for internal links.

That captures roughly 95 percent of the SEO value the tooling can give.

## 1. The five front-matter fields that matter most

```yaml
---
title: "Debugging flaky tests in Go"
description: "How I diagnosed a goroutine leak that made one in fifty CI runs hang, using only the standard library and pprof."
date: 2026-05-01
last_modified_at: 2026-05-03
image: /assets/images/posts/2026-05-01/pprof-flame.png
categories: [testing]
tags: [go, debugging, pprof]
---
```

What each one does:

- **`title`**: appears in `<title>`, search results, and social previews.
  Keep under ~60 characters; longer titles are truncated by Google. Do not
  repeat the site name; `jekyll-seo-tag` concatenates "Title - Site Name"
  automatically.
- **`description`**: emits `<meta name="description">`, the OG and Twitter
  description tags, and feeds into JSON-LD. Without an explicit value,
  `jekyll-seo-tag` falls back to the auto-extracted excerpt, which is
  rarely well-tuned. Always write one. Aim for 140-160 characters.
- **`date`**: used in JSON-LD `datePublished`, in feed `<published>`, and
  in URL paths if your permalink includes the date. Keep this in sync
  with the date in the filename.
- **`last_modified_at`**: optional but high-leverage. Generates JSON-LD
  `dateModified`, which signals to Google that the post is being kept
  current. Update it whenever you make a non-trivial revision.
  GitHub Pages cannot auto-derive this from file mtime (the
  `jekyll-last-modified-at` plugin is not allowlisted), so set it by
  hand on revision.
- **`image`**: the social preview image. Without one, link previews on
  Twitter, Slack, LinkedIn, and iMessage show only text. Use a 1200x630
  PNG or JPG (or WebP). Keep it under 1 MB. Path is absolute from the
  site root.

## 2. Filename and slug

The slug becomes the URL's last segment, and URLs are forever.

- Lowercase, hyphenated, descriptive. Aim for 3-6 words.
- Include 2-4 keywords from the title. Avoid stop words (`a`, `the`,
  `of`, `in`) when they do not add meaning.
- Never change a slug after publishing. If you must, add
  `redirect_from: ["/old-slug/"]` to the new post and enable
  `jekyll-redirect-from` (already on the GitHub Pages allowlist).

Examples:

```
_posts/2026-05-01-debugging-flaky-tests-in-go.md   # good
_posts/2026-05-01-flaky-tests.md                   # too vague
_posts/2026-05-01-the-time-i-debugged-a-flaky-test-in-our-go-test-harness.md   # too long
```

## 3. Heading hierarchy in the body

Minima's `post.html` layout already renders the post title as `<h1>`. So
post bodies should start at `h2` and never skip levels.

```markdown
## Background           (h2 - major sections)
### How pprof works     (h3 - subsections)
#### A code example     (h4 - rare)
```

Why it matters:

- Google parses heading structure to understand page topic. Skipping
  levels (h2 to h4) confuses the model.
- Screen readers use it for navigation.
- Both contribute to Page Experience signals.

Use keywords in headings, but write them for humans first.

## 4. Images

For every `<img>`:

```html
<img src="/assets/images/posts/2026-05-01/diagram.png"
     alt="Architecture diagram for the ingestion pipeline"
     width="1200" height="630" loading="lazy">
```

- **`alt` text**: describe what the image *shows*, not what it *is*.
  "Bar chart of p99 latency by region" beats "screenshot.png."
- **`width` and `height`**: prevent Cumulative Layout Shift (a Core Web
  Vital). Use the actual pixel dimensions of the file.
- **`loading="lazy"`**: improves Largest Contentful Paint (another Core
  Web Vital).
- **File size**: a 4 MB unoptimized PNG can drop your Core Web Vitals
  score from "Good" to "Poor." Run images through `squoosh.app` or
  `cwebp` before committing. Prefer WebP or AVIF over PNG/JPG.

## 5. Internal linking

Use the `post_url` Liquid tag for links to other posts. It produces the
permalink even if you change permalink rules later, and Jekyll fails the
build if the target does not exist (catches dead links at build time).

```markdown
{% raw %}For prerequisites, see [my earlier post]({% post_url 2026-04-15-go-testing-basics %}) on Go testing basics.{% endraw %}
```

Anchor text matters: write `[debugging goroutine leaks]`, not `[click
here]`. Google reads anchor text as a signal of what the linked page is
about.

## 6. Optional fields worth knowing

- **`canonical_url`**: set this only if the post is also published
  elsewhere (Medium, dev.to, a company blog). Otherwise leave unset;
  `jekyll-seo-tag` emits a self-referential canonical automatically.
- **`excerpt`**: hand-written summary that overrides the first paragraph
  on the homepage. Or set `excerpt_separator: "<!--more-->"` in
  `_config.yml` and put `<!--more-->` in posts where you want the cut.
- **Unlisted posts**: minima does not honor a `hidden` flag, and Jekyll
  has no built-in "publish but hide from listings" toggle. To publish a
  post at a URL while keeping it out of the home list, feed, sitemap, and
  tags index, move it from `_posts/` into a separate Jekyll collection
  (e.g. `_unlisted/`). Declare the collection in `_config.yml` with
  `output: true` and the same permalink pattern your posts use, and set
  `sitemap: false` in the collection's defaults. Files in a collection
  are not pulled into `site.posts`, which is what every list on this
  site iterates.

## A complete reference post

```markdown
---
title: "Debugging flaky tests in Go"
description: "How I diagnosed a goroutine leak that made one in fifty CI runs hang, using only the standard library and pprof."
date: 2026-05-01
last_modified_at: 2026-05-01
image: /assets/images/posts/2026-05-01/pprof-flame.png
categories: [testing]
tags: [go, debugging, pprof]
---

A short opening paragraph that summarizes the problem and the result.
This is what readers see in search results if `description` is missing.

## Background

Two or three paragraphs of context. Use {% raw %}[internal links]({% post_url 2026-04-15-go-testing-basics %}){% endraw %}
liberally; they help readers and search engines.

## What I tried first

Body text with a code block:

```go
func TestRaceCondition(t *testing.T) {
    ...
}
```

## How pprof helped

A captioned figure with explicit dimensions and lazy loading:

<figure>
  <img src="/assets/images/posts/2026-05-01/pprof-flame.png"
       alt="Flame graph showing 12 blocked goroutines waiting on a closed channel"
       width="1200" height="630" loading="lazy">
  <figcaption>Flame graph from `go tool pprof`. The blocked goroutines are the orange spikes.</figcaption>
</figure>

## Lessons

A short list of takeaways readers can act on.

## Further reading

- [Go's runtime/pprof docs](https://pkg.go.dev/runtime/pprof)
```

That post automatically produces:

- A descriptive `<title>` and `<meta name="description">`.
- Open Graph and Twitter Card tags including the image.
- JSON-LD `BlogPosting` with `headline`, `datePublished`,
  `dateModified`, `author`, `image`, `description`, `url`.
- An entry in `feed.xml`.
- An entry in `sitemap.xml` with `lastmod` set from `last_modified_at`.

## Site-wide defaults

`_config.yml` sets defaults so every post automatically gets `layout:
post` and `author: Jeff Wu` without being typed in the front matter:

```yaml
defaults:
  - scope:
      path: ""
      type: posts
    values:
      layout: post
      author: Jeff Wu
```

This keeps per-post front matter focused on what is actually
post-specific (title, description, date, image, etc.).

## Verification

After the post is built locally:

```bash
curl -s http://127.0.0.1:4000/2026/debugging-flaky-tests-in-go/ \
  | grep -E '<title>|description|og:|twitter:|canonical|application/ld\+json' \
  | head -30
```

Once the site is deployed, paste the URL into:

- `search.google.com/test/rich-results` - shows the parsed JSON-LD and
  any errors.
- `cards-dev.twitter.com/validator` - shows the social card preview.
- `pagespeed.web.dev` - gives Core Web Vitals scores and concrete fixes.

## Things NOT worth doing

- Keyword stuffing in front matter or body. Modern engines penalize it.
- Manually adding `<meta name="description">` or `<title>` tags in post
  bodies. `jekyll-seo-tag` emits them; duplicates confuse parsers.
- Excessive tags or categories. Five-plus tags per post does not help
  SEO and creates noisy archive pages if you ever generate them.
- Tracking pixels and analytics scripts that block render. They hurt
  Core Web Vitals more than they help insight.
