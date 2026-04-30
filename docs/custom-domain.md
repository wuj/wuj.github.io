---
layout: page
title: Pointing jeffwu.com at this GitHub Pages site
---

How to serve `wuj.github.io` at the custom domain `jeffwu.com`. Three places
to change things, in this order: the repo, your DNS, and the GitHub Pages
settings.

## 1. Repo changes

### a) Create a `CNAME` file at the repo root

The filename is exactly `CNAME` (uppercase, no extension). The contents are
a single line with the bare domain name:

```
jeffwu.com
```

GitHub Pages reads this file on every build to learn the custom domain.
Committing it to the repo (rather than only setting it via the Pages
Settings UI) keeps the repo as the source of truth so the domain does not
get accidentally cleared.

### b) Update `url:` in `_config.yml`

Change:

```yaml
url: https://wuj.github.io
```

to:

```yaml
url: https://jeffwu.com
```

This makes `jekyll-seo-tag` emit canonical URLs and Open Graph tags using
the new hostname. Restart the local server after editing `_config.yml`.

Commit and push both changes to `origin/main`.

## 2. DNS at the registrar

Configure both the apex (`jeffwu.com`) and the `www` subdomain so visitors
can use either; GitHub Pages will redirect one to the other based on
whichever you set as the canonical domain in step 3.

### Apex (`jeffwu.com`)

Four `A` records pointing to GitHub Pages' anycast IPs.

| Type | Name | Value |
| --- | --- | --- |
| A | `@` (or blank) | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Optional but recommended `AAAA` records for IPv6:

| Type | Name | Value |
| --- | --- | --- |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

### `www.jeffwu.com`

A single `CNAME` record pointing to the GitHub Pages hostname.

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `www` | `wuj.github.io.` |

The trailing dot matters for some registrars; others add it automatically.

### Notes about registrar UIs

- The "Name" field naming varies. `@` and blank usually both mean "the
  apex itself." Some registrars want `jeffwu.com` typed in full, some want
  it left blank. Check the registrar's documentation if unsure.
- TTL: leave at the default (often 1 hour). Smaller TTL just means future
  changes propagate faster.
- If the registrar offers an `ALIAS` or `ANAME` record type for the apex,
  you can use a single ALIAS / ANAME record with target `wuj.github.io`
  instead of the four A records. Functionally equivalent. Standard A
  records work everywhere.
- The IP addresses above are GitHub Pages' published anycast IPs. They
  have been stable for years. If you ever need to confirm the current
  set, see the GitHub docs at
  `https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site`.

## 3. GitHub repo settings

After the changes from step 1 are pushed and the DNS records from step 2
are entered:

1. Open `https://github.com/wuj/wuj.github.io/settings/pages`.
2. Under "Custom domain," enter `jeffwu.com` and click "Save." (If the
   `CNAME` file from step 1 is already pushed, this field is often
   pre-filled.)
3. GitHub runs a DNS check. It usually passes within minutes if DNS is
   correctly configured.
4. Once the DNS check passes, the "Enforce HTTPS" checkbox becomes
   available. Check it. This forces all `http://` requests to redirect
   to `https://`.
5. The TLS certificate provisions automatically via Let's Encrypt. This
   can take up to 24 hours but is usually within an hour.

## 4. Verification

Run these from any terminal once DNS has propagated:

```bash
# DNS resolves correctly
dig +short jeffwu.com
# Expect: the four GitHub Pages IPs (185.199.108.153 .. 185.199.111.153)

dig +short www.jeffwu.com
# Expect: wuj.github.io (or the four IPs after the CNAME resolves)

# HTTPS works and certificate is valid
curl -sI https://jeffwu.com | head -5
# Expect: HTTP/2 200, server: GitHub.com

# www redirects to apex (or apex to www, depending on which is canonical)
curl -sI http://www.jeffwu.com | head -5
# Expect: a 301 redirect to https://jeffwu.com
```

## Things to know

- **DNS propagation takes minutes to a few hours.** Sometimes longer if
  the old DNS records had a high TTL. If `dig` does not show the new
  values yet, wait and try again.
- **HTTPS cert provisioning is the slowest step.** Up to 24 hours after
  DNS verifies, typically within an hour. The site is reachable over
  HTTP during this time but unencrypted; the "Enforce HTTPS" checkbox
  stays grayed out until the cert is ready.
- **Reverting.** To disable the custom domain: delete the `CNAME` file,
  push, and remove the custom domain in Settings -> Pages. The site
  reverts to `https://wuj.github.io`.
- **The `repository:` field in `_config.yml` is unrelated** to the custom
  domain. It is read by `jekyll-github-metadata` to populate `site.github`
  and is fine left as `wuj/wuj.github.io`.
- **Local development is unaffected.** `bundle exec jekyll serve` still
  runs at `http://127.0.0.1:4000/`. Only the deployed site is reached via
  the custom domain.
