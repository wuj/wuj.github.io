# CLAUDE.md

## Project

This is a GitHub Pages user site (`wuj.github.io`) built on the `minima` theme. The repo aims to stay small: commit only files needed for the site to render, for GitHub Pages compatibility, or for the local development toolchain. Visual customization is concentrated in `assets/main.scss` (typography scale, color palette, dark mode, Rouge syntax highlighting). No minima `_layouts/` or `_includes/` files are overridden.

The user handles commits and pushes. Do not run `git commit` or `git push`.

## Prose

Before writing or editing prose in a file, read the surrounding prose. If the file already has a substantial amount of writing, match its voice: sentence length, formality, use of contractions, jargon level, paragraph rhythm, how it addresses the reader. Adapt to what is there rather than imposing a different style on top of it. Only fall back to the default voice below when the file is new, nearly empty, or has too little prose to establish a style.

Default voice (use when there is nothing to match): write so a curious non-expert can follow along. Aim for the feel of a friend explaining something over coffee, not a textbook or a paper. Short sentences, contractions, plain words. When a technical term shows up for the first time, give a quick gloss in everyday language before leaning on it. Prefer concrete examples and analogies over abstract definitions. Skip warm-up phrases and essay-style intros ("In this post we will explore..."); just say the thing. It is fine to start sentences with "and", "but", or "so". If a sentence sounds stiff when read out loud, or would make a smart friend without the background reach for a dictionary, rewrite it.

All generated prose and code comments must be ASCII-only UTF-8: straight quotes, no curly quotes, no em dashes, no en dashes, no ellipsis characters, and no emojis. Use hyphens only for real hyphenation, not as dash substitutes.

Avoid filler words that gloss over the actual mechanism:

- Do not describe things as "clean", "cleanly", or "cleaner" when reaching for general praise. These words skip past the specific detail that matters. Pick a word that names what is actually true: "unambiguous", "reversible", "well-defined", "deterministic", "easy to read", "few moving parts", "widely used", "modern", "small", "self-contained", and so on. If you cannot pick a more specific word, the sentence probably does not need the qualifier at all.
- Do not write "X is doing the work" or "X is doing all the work" or "X does the heavy lifting". This pattern claims importance without explaining what X actually computes. Replace it with a verb that names the operation: "X computes the dot products", "X mixes the heads", "X applies the residual", "X turns scores into probabilities", and so on. If the sentence is summarizing causation, name the contribution explicitly ("X is one of the main mechanisms that pulls Y into Z's representation") rather than asserting that X is "the" or "the main" piece doing the work.
- Do not describe things as "quiet", "quietly", "silent", or "silently" (as in "quietly drift", "quietly delete", "silently fall back"). These words gesture at "you wouldn't notice" without saying what actually happens, and they are not how people talk in conversation. Either name the mechanism ("the implementation could drift out of sync without any compile error to flag it", "these helpers replace utility classes you used to write") or just delete the qualifier. If the point is that something is hard to notice, say what makes it hard to notice.
- Do not write "X carries the weight", "X carries most of the weight", "the weight falls on X", "X bears the weight", or other "weight"-as-metaphor phrasings. This is essay register, not how people talk, and it dodges naming what X actually does. Replace it with a verb that names the contribution: "X accounts for most of the shift", "these three features are the ones that change how the code reads", "most of the impact comes from X". Same principle applies to other vague-effort metaphors ("does the heavy lifting", "carries the load"): name the operation instead.
- Avoid the broader family of essay-register filler that praises something without saying what is true about it. Specific patterns to drop: "X earns its keep" (say what X buys you), "the real payoff" (say what the payoff is), "X shines when..." (say what makes X well-suited - usually "X is well-suited when..." or describe the concrete property), "the headline benefit / feature" (just describe the benefit), "X reads cleanly / fluently" (covered by the clean rule above; name the concrete property), "X is the connective tissue" or other body-part metaphors ("the bones are the same", "the heart of"), "papercuts" as a stand-in for "small repetitive annoyances" (name the annoyance), "free win", "earns its place", "punches above its weight", "out of the gate", "comes into its own", "gets out of the way", "just works". Rule of thumb: if you cannot replace the phrase with a sentence that names the specific property, mechanism, or operation, the phrase is doing decoration and not communication. Cut it or rewrite it.
- Never use "thing" or "things" as a stand-in noun. Do not write "do the obvious thing", "the thing that matters", "the thing X does", "do the right thing", "say the thing", "two things to notice", "a few things to know", or similar. "Thing" is a placeholder that signals you have not yet named what you mean. Replace it with the actual noun: the operation, the property, the rule, the constraint, the value, the call, the step, the decision. If the placeholder would expand into a list, write "two properties", "two behaviors", "three observations", "three rules" - whatever the items actually are. The only acceptable use of "thing" is inside a quoted phrase or proper name where it cannot be removed without changing the citation.

Same principle generalizes: prefer concrete verbs and concrete nouns over vague praise or vague effort. If a phrase could be deleted without changing the meaning, delete it.

## Commands

Ruby is pinned by `.ruby-version` (`3.3.4`); if the local Ruby does not match, use the user's Ruby version manager instead of changing the project pin casually.

```bash
bundle install                                       # first-time setup or after Gemfile changes
bundle exec jekyll serve                             # local preview at http://127.0.0.1:4000
JEKYLL_ENV=production bundle exec github-pages build # closest local proxy for GitHub Pages
```

There are no tests, linters, or CI scripts. For content or config changes, run the production build when practical. For visual checks, run the local server.

## Constraints

- Keep the `github-pages "~> 232"` pin in `Gemfile`. Before changing it, check <https://pages.github.com/versions/> and update `.ruby-version` only if the GitHub Pages build Ruby has moved. Do not loosen the pin.
- Keep `webrick` in `Gemfile`; Ruby 3.0+ needs it for `bundle exec jekyll serve`.
- Keep both `jekyll-feed` and `jekyll-seo-tag` enabled in `_config.yml`; minima's head include calls their Liquid tags.
- `Gemfile.lock` is intentionally ignored. Do not add it unless the project policy changes.
- Do not add empty `about.md`, `404.html`, `_layouts/`, or `_includes/` files just to make the tree look complete. Minima supplies those theme files.

## Editing

Prefer minimal, targeted changes that preserve GitHub Pages compatibility. Use existing Jekyll and minima conventions before adding custom layouts or assets. If customizing a theme file is necessary, copy only the specific file from the installed `minima` gem and edit the smallest surface needed.

Avoid decorative dependencies, generated artifacts, local editor state, unrelated rewrites, and removal of user-created changes.
