# Cloud Mode

Cloud mode sends the conversion request to a remote service instead of performing the full workflow on the local machine.

## When to use it

Choose cloud mode when:

- You need cloud-only enhancement features.
- You want remote execution as part of a managed workflow.
- Your team standardizes on service-backed conversion.

## Authentication

Cloud execution requires credentials. The common setup paths are:

- Interactive login with `deckhtml auth login`
- Storing an API key with `deckhtml config set api-key <key>`
- Providing `DECKHTML_API_KEY` in CI or container environments

## Example

```bash
deckhtml index.html \
  -o deck.pptx \
  --mode cloud \
  --rebuild-svg \
  --rebuild-chart \
  --embed-fonts \
  --map-motion
```

## Operational note

If your team uses Mintlify as the public help center, cloud-mode setup should usually be documented alongside onboarding or authentication instructions so developers can self-serve the full flow.
