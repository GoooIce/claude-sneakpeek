import type { OverlayMap } from '../types.js';
import { operatingSpec, subjectiveWorkSpec, verbositySpec, skillClarificationSpec } from '../shared.js';

const buildZhipuContract = () =>
  `
<explicit_guidance>
Provider: Zhipu AI (GLM via BigModel.cn)

<authentication>
- Use API-key auth only.
- Ignore ANTHROPIC_AUTH_TOKEN if present.
- Required env:
  - ANTHROPIC_API_KEY (Claude Code API-key mode)
</authentication>

<tool_info>
Zhipu AI provides MCP servers for enhanced capabilities:
- Vision MCP server: Image analysis and understanding
- Search MCP server: Web search functionality
- Web Reader MCP server: URL content reading

These MCP servers should be configured by the user following Zhipu's official documentation.
</tool_info>

<tool_routing priority="critical">
When you need external info or image understanding, follow this routing:
1) For image analysis:
   - Use Zhipu's Vision MCP server if configured
   - Otherwise, use Bash to invoke Zhipu CLI tools if available
2) For web search:
   - Use Zhipu's Search MCP server if configured
   - Otherwise, use standard WebSearch tool
3) For reading URLs:
   - Use Zhipu's Web Reader MCP server if configured
   - Otherwise, use standard WebFetch tool

Note: Standard Claude Code tools (WebSearch, WebFetch) are available as fallbacks.
</tool_routing>

<important_notes>
- Zhipu AI offers GLM-4.7 for Sonnet/Opus tiers
- GLM-4.5-Air is used for Haiku (fast) tier
- MCP servers provide specialized capabilities beyond standard tools
- Refer to Zhipu AI official documentation for MCP server setup
</important_notes>

${operatingSpec()}

${subjectiveWorkSpec}

${verbositySpec}
</explicit_guidance>
`.trim();

export const buildZhipuExcerpt = () =>
  `
<tool_info>
- Standard Claude Code tools are available (WebSearch, WebFetch, etc.)
- Zhipu MCP servers provide enhanced capabilities (vision, search, web reading)
- Use MCP servers when configured for best experience
- Fallback to standard tools when MCP is unavailable
</tool_info>

${subjectiveWorkSpec}
`.trim();

export const buildZhipuOverlays = (): OverlayMap => ({
  main: buildZhipuContract(),
  mcpCli: `
${buildZhipuExcerpt()}

<note>
Zhipu AI MCP servers: vision, search, and web reading capabilities available when configured.
Refer to official documentation for setup instructions.
</note>

Use standard tools when MCP servers are not configured.
  `.trim(),
  taskAgent: `
<explicit_guidance>
You are a Task subagent. Stay within requested scope, but be proactive about missing prerequisites.
Verify key claims with tools when possible; cite file paths and command outputs.
</explicit_guidance>

${buildZhipuExcerpt()}

${verbositySpec}
  `.trim(),
  bash: `
<tool_info>
Zhipu AI provides MCP servers for:
- Image analysis (Vision MCP)
- Web search (Search MCP)
- URL reading (Web Reader MCP)

Use these when available. Standard Claude Code tools work as fallbacks.
</tool_info>

<explicit_guidance>
For external information:
- If Zhipu MCP servers are configured, use them
- Otherwise, use standard WebSearch/WebFetch tools
- For image analysis, prefer Vision MCP when available
</explicit_guidance>
  `.trim(),
  webfetch: `
<explicit_guidance>
Zhipu AI routing: Prefer Zhipu's Web Reader MCP server when configured, otherwise use standard WebFetch.
</explicit_guidance>
  `.trim(),
  websearch: `
<explicit_guidance>
Zhipu AI routing: Prefer Zhipu's Search MCP server when configured, otherwise use standard WebSearch.
</explicit_guidance>
  `.trim(),
  mcpsearch: `
<note>
Zhipu AI MCP servers provide specialized capabilities:
- Vision MCP: Image analysis
- Search MCP: Web search
- Web Reader MCP: URL reading

Use these when configured for optimal results.
</note>

<explicit_guidance>
When MCP servers are configured, prefer them over standard tools.
Otherwise, use standard Claude Code tools (WebSearch, WebFetch, etc.).
</explicit_guidance>
  `.trim(),
  skill: skillClarificationSpec,
});
