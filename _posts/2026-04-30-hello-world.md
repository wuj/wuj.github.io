---
title: "Hello, world"
excerpt: A sample first post to confirm posts render correctly.
description: "A sample first post that doubles as a visual test of the site's typography, code-block highlighting, lists, blockquotes, and inline-code styling."
date: 2026-04-30
last_modified_at: 2026-05-01
# image: /assets/images/posts/2026-04-30/hero.png
categories: [meta]
tags: [setup, jekyll, minima, typography]
published: false
---

A sample first post to confirm posts render correctly. Delete or replace it
when you write the real first one.

## Typography

Body text uses the system sans stack, which resolves to SF Pro on macOS,
Segoe UI on Windows, and Roboto on Android. Headings have tighter letter
spacing and a slightly heavier weight than the body, set in
`assets/main.scss`.

### A third-level heading

The vertical rhythm is driven by `$base-line-height: 1.6` and the content
column is capped at `$content-width: 720px` for a comfortable line measure
of roughly 75 characters at 18px.

## Code

A short Python snippet to confirm Rouge tokenization and the code-block
styling:

```python
def fibonacci(n):
    """Return the n-th Fibonacci number."""
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))
```

A long shell command to verify horizontal scrolling kicks in on `pre`:

```bash
docker run --rm -it --name dev-postgres -p 5432:5432 -e POSTGRES_PASSWORD=changeme -e POSTGRES_USER=app -e POSTGRES_DB=app_dev postgres:16-alpine
```

Inline code, like `git rebase -i HEAD~3` or the env var `PATH`, should
render in a small grey pill.

## Lists

- First point.
- Second point with `inline code` mixed in.
- Third point.

1. Numbered lists work too.
2. They preserve their numbering across paragraph breaks.
3. The third item.

## Blockquote

> Programs must be written for people to read, and only incidentally for
> machines to execute.
>
> Harold Abelson, Structure and Interpretation of Computer Programs

## Link and image

See the [Jekyll docs](https://jekyllrb.com/docs/posts/) for the full post
front-matter reference.
