# AGENTS.md

Instructions for Codex and other coding agents working in this repository.
These rules apply to the whole repo.

## Project

This is the GitHub Pages user site for `wuj.github.io`, served at
`https://jeffwu.com`. It is a small Jekyll site built on the default
`minima` theme.

Most structure comes from minima. Keep local customization narrow:
`_config.yml` for site and GitHub Pages settings, `_posts/` for published
posts, `assets/main.scss` for typography, colors, dark mode, and Rouge syntax
highlighting, `docs/` for excluded repo notes, and `_unlisted/` for future
non-post content that should not be listed with `site.posts`.

Keep the repo small. Change only files needed for the site, GitHub Pages
compatibility, or local development. Do not run `git commit` or `git push`;
the user handles all commits and pushes.

## Prose

When editing prose, first scan the surrounding text. If the document already
has a substantial amount of prose, infer its overall style and match it. If
there is not enough existing prose to guide the edit, use a casual,
conversational style. Prefer everyday words, short sentences, contractions when
they sound natural, and direct explanations that feel like one person talking
to another. Avoid academic, corporate, or overly polished phrasing unless the
topic needs that tone. Aim for a layman-friendly feel: assume the reader is
smart but may not know the jargon, explain specialized terms the first time
they matter, and use simple examples when they make an idea easier to follow.
Generated prose and code comments must be ASCII-only UTF-8: straight quotes,
no curly quotes, no em dashes, no en dashes, no ellipsis characters, and no
emojis. Use hyphens only for real hyphenation, not as dash substitutes.

Prefer concrete verbs and nouns over vague praise or vague effort. Avoid
"clean", "cleanly", or "cleaner" as general praise; name the specific quality
instead. Avoid phrases like "X is doing the work" or "X does the heavy lifting";
name the operation X performs. Avoid "X carries the weight", "the weight falls
on X", "X bears the weight", "carries the load", and similar vague-effort
metaphors; name the contribution instead. Avoid "quiet", "quietly", "silent",
or "silently" when they gesture at "you would not notice" without saying what
actually happens; either name the mechanism or delete the qualifier. If the
point is that something is hard to notice, say what makes it hard to notice. If
a phrase could be deleted without changing the meaning, delete it.

Codex must not use the broader family of essay-register filler that praises a
thing without saying what is true about it. Specific patterns to drop: "X earns
its keep" (say what X buys you), "the real payoff" (say what the payoff is), "X
shines when..." (say what makes X well-suited - usually "X is well-suited
when..." or describe the concrete property), "the headline benefit / feature"
(just describe the benefit), "X reads cleanly / fluently" (covered by the clean
rule above; name the concrete property), "X is the connective tissue" or other
body-part metaphors ("the bones are the same", "the heart of"), "papercuts" as
a stand-in for "small repetitive annoyances" (name the annoyance), "free win",
"earns its place", "punches above its weight", "out of the gate", "comes into
its own", "gets out of the way", "just works". Rule of thumb: if you cannot
replace the phrase with a sentence that names the specific property, mechanism,
or operation, the phrase is doing decoration and not communication. Cut it or
rewrite it.

Never write filler phrases like "do the thing", "do the obvious thing", or
similar uses of "thing" that avoid naming the action. Say the actual action:
render the page, validate the input, copy the file, update the dependency, or
whatever operation is meant.

## Commands

Run commands from the repository root. Ruby is pinned by `.ruby-version`
(`3.3.4`); if the local Ruby does not match, use the user's Ruby version
manager instead of changing the project pin.

```bash
bundle install
bundle exec jekyll serve
JEKYLL_ENV=production bundle exec github-pages build
```

On Windows PowerShell, use PowerShell environment syntax instead of Unix inline
environment assignment:

```powershell
$env:JEKYLL_ENV='production'; bundle exec github-pages build
```

If `bundle` is not found, report that Bundler is missing from PATH. Do not
change the Ruby pin, install gems globally, or add generated lockfiles unless
the user asks.

There are no tests, linters, or CI scripts. For content or config changes,
run the production build when practical. For visual checks, run the local
server at `http://127.0.0.1:4000`.

### Python snippets on Windows

Do not assume `python` or `py` points to a usable interpreter on Windows; they
may resolve to Microsoft Store aliases. If that happens, check for the user's
local Python at:

```powershell
C:\Users\jeffr\AppData\Local\Python\bin\python.exe
```

For one-off Python checks that need packages not installed locally, prefer
ephemeral `uv run --with ...` commands from stdin instead of installing into
the repo or creating temporary files:

```powershell
@'
# python code here
'@ | uv run --with tiktoken --with transformers --with torch python -
```

For GPT-2 attention inspection with newer `transformers`, load the model with
eager attention when using `output_attentions=True`:

```python
GPT2LMHeadModel.from_pretrained("gpt2", attn_implementation="eager")
```

Without eager attention, some backends may not return attention tensors.

### Prolog snippets on Windows

Do not assume `swipl` is installed on the Windows PATH. For quick Prolog or DCG
checks, pipe a PowerShell here-string into Docker:

```powershell
$program | docker run --rm -i swipl:latest swipl -q -g "['user'], run"
```

Keep checks ephemeral, prefer stdin over temporary files, include `halt`, and
use distinct predicate names when checking several snippets.

## Constraints

- Keep `github-pages "~> 232"` pinned in `Gemfile`. Before changing it,
  check <https://pages.github.com/versions/> and update `.ruby-version`
  only if the GitHub Pages build Ruby has moved. Do not loosen the pin.
- Keep `webrick` in `Gemfile`; Ruby 3.0+ needs it for local serving.
- Keep `jekyll-feed`, `jekyll-seo-tag`, and `jekyll-sitemap` enabled in
  `_config.yml`; minima's head include calls the feed and SEO Liquid tags.
- Keep `baseurl: ""` in `_config.yml` for this user/custom-domain site.
- Keep `email: hello@jeffwu.com` in `_config.yml`; this address is
  intentionally public.
- Keep `Gemfile.lock` ignored unless the project policy changes.
- If overriding a minima theme file is necessary, copy only the specific
  file from the installed minima gem and edit the smallest useful surface.
- Do not add empty `about.md`, `404.html`, `_layouts/`, `_includes/`, or asset
  files just to make the tree look complete. Minima supplies those theme files.

## Editing

Prefer minimal, targeted changes that preserve GitHub Pages compatibility.
Use existing Jekyll, Liquid, SCSS, and minima conventions before adding custom
structure.

Avoid decorative dependencies, generated artifacts, local editor state,
unrelated rewrites, and removal of user-created changes.
