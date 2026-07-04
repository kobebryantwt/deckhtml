# Quickstart

This is the shortest path from an HTML file to a generated deck artifact.

## 1. Prepare an HTML slide

Create an HTML file such as `index.html`. DeckHTML works best when each page represents a single slide or a clearly ordered set of slides.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Hello DeckHTML</title>
  </head>
  <body>
    <section>
      <h1>Hello DeckHTML</h1>
      <p>Convert this page into presentation output.</p>
    </section>
  </body>
</html>
```

## 2. Run the CLI

Use the package without a global install:

```bash
npx -y @deckflow/deckhtml@latest index.html -o deck.pptx
```

You can also install it globally:

```bash
npm install -g @deckflow/deckhtml
deckhtml index.html -o deck.pptx
```

If you want to generate a different output format, pass `--format` explicitly.

## 3. Check the result

Successful conversion writes the target artifact and prints either the output path or structured JSON, depending on your output mode.

Examples:

```bash
deckhtml index.html -o deck.pdf --format pdf
deckhtml index.html -o ./frames --format png
deckhtml index.html -o deck.pptx --json
```

## 4. Pick an execution mode

- Use [Local Mode](/local-mode) when conversion should run on the same machine.
- Use [Cloud Mode](/cloud-mode) when you need remote execution or cloud-only enhancement features.

## 5. Go deeper

- Learn the core [Concepts](/concepts)
- Review [Configuration](/configuration)
- Explore richer [CLI examples](/cli/examples)
