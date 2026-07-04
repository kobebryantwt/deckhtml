# MCP Tools

This page describes the role of the DeckHTML MCP surface in the documentation set.

## Tool categories

The current repository structure suggests three common classes of MCP behavior:

- Convert HTML into target artifacts
- Inspect or validate inputs before conversion
- Return structured results to the calling agent

## Expected usage pattern

An MCP client typically:

1. Selects a DeckHTML tool
2. Sends input HTML or references to input sources
3. Receives output metadata or artifact locations
4. Surfaces the result back into the editor or agent workflow

## Documentation note

As the code-backed MCP contracts mature, this page should become the precise contract reference for tool names, arguments, and response payloads.
