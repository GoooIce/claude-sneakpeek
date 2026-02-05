# claude-sneakpeek

Get a parallel build of Claude Code that unlocks feature-flagged capabilities like swarm mode.

Demo video of swarm mode in action: https://x.com/NicerInPerson/status/2014989679796347375

This installs a completely isolated instance of Claude Code—separate config, sessions, MCP servers, and credentials. Your existing Claude Code installation is untouched.

## Install

```bash
npx @realmikekelly/claude-sneakpeek quick --name claudesp
```

Add `~/.local/bin` to your PATH if not already (macOS/Linux):

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
```

Then run `claudesp` to launch.

## What gets unlocked?

Features that are built into Claude Code but not yet publicly released:

- **Swarm mode** — Native multi-agent orchestration with `TeammateTool`
- **Delegate mode** — Task tool can spawn background agents
- **Team coordination** — Teammate messaging and task ownership

## Commands

```bash
npx @realmikekelly/claude-sneakpeek quick --name claudesp   # Install
npx @realmikekelly/claude-sneakpeek update claudesp         # Update
npx @realmikekelly/claude-sneakpeek remove claudesp         # Uninstall
```

## Where things live

```
~/.claude-sneakpeek/claudesp/
├── npm/           # Patched Claude Code
├── config/        # Isolated config, sessions, MCP servers
└── variant.json

~/.local/bin/claudesp   # Wrapper script
```

## Alternative providers

Supports Z.ai, MiniMax, Zhipu AI, OpenRouter, and local models via cc-mirror. See [docs/providers.md](docs/providers.md).

**Quick examples:**

```bash
# Z.ai (GLM models)
npx @realmikekelly/claude-sneakpeek quick --provider zai --api-key "$Z_AI_API_KEY"

# MiniMax (MiniMax-M2.1)
npx @realmikekelly/claude-sneakpeek quick --provider minimax --api-key "$MINIMAX_API_KEY"

# Zhipu AI (智谱AI GLM-4.7)
npx @realmikekelly/claude-sneakpeek quick --provider zhipu --api-key "$ZHIPU_API_KEY"

# OpenRouter (100+ models)
npx @realmikekelly/claude-sneakpeek quick --provider openrouter --api-key "$OPENROUTER_API_KEY"
```

## Credits

Fork of [cc-mirror](https://github.com/numman-ali/cc-mirror) by Numman Ali.

## License

MIT
