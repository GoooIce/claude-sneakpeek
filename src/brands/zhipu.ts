import type { TweakccConfig, Theme } from './types.js';
import { DEFAULT_THEMES } from './defaultThemes.js';
import { formatUserMessage, getUserLabel } from './userLabel.js';

/**
 * Zhipu blocked tools - empty for now (using standard Claude Code tools)
 * Zhipu provides MCP servers for vision, search, and web reading
 */
export const ZHIPU_BLOCKED_TOOLS: string[] = [];

type Rgb = { r: number; g: number; b: number };

const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)));

const hexToRgb = (hex: string): Rgb => {
  const normalized = hex.replace('#', '').trim();
  if (normalized.length === 3) {
    const [r, g, b] = normalized.split('');
    return {
      r: clamp(parseInt(r + r, 16)),
      g: clamp(parseInt(g + g, 16)),
      b: clamp(parseInt(b + b, 16)),
    };
  }
  if (normalized.length !== 6) {
    throw new Error(`Unsupported hex color: ${hex}`);
  }
  return {
    r: clamp(parseInt(normalized.slice(0, 2), 16)),
    g: clamp(parseInt(normalized.slice(2, 4), 16)),
    b: clamp(parseInt(normalized.slice(4, 6), 16)),
  };
};

const rgb = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${r},${g},${b})`;
};

const mix = (hexA: string, hexB: string, weight: number) => {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const w = Math.max(0, Math.min(1, weight));
  return `rgb(${clamp(a.r + (b.r - a.r) * w)},${clamp(a.g + (b.g - a.g) * w)},${clamp(a.b + (b.b - a.b) * w)})`;
};

const lighten = (hex: string, weight: number) => mix(hex, '#ffffff', weight);

const ZHIPU_BLUE = '#0066FF';

const palette = {
  base: '#0a0e1a',
  surface: '#121826',
  panel: '#1a2232',
  border: '#2a3448',
  borderStrong: '#3a4658',
  text: '#e8ecf0',
  textMuted: '#b8c4d8',
  textDim: '#7a88a0',
  core: ZHIPU_BLUE,
  deep: '#0047B3',
  sky: '#4DA6FF',
  cyan: '#00D9FF',
  green: '#00E676',
  red: '#FF5252',
  orange: '#FF9100',
  purple: '#B388FF',
};

const theme: Theme = {
  name: 'Zhipu Intelligence',
  id: 'zhipu-intelligence',
  colors: {
    autoAccept: rgb(palette.green),
    bashBorder: rgb(palette.core),
    claude: rgb(palette.core),
    claudeShimmer: rgb(palette.sky),
    claudeBlue_FOR_SYSTEM_SPINNER: rgb(palette.sky),
    claudeBlueShimmer_FOR_SYSTEM_SPINNER: rgb(palette.cyan),
    permission: rgb(palette.sky),
    permissionShimmer: rgb(palette.cyan),
    planMode: rgb(palette.deep),
    ide: rgb(palette.cyan),
    promptBorder: rgb(palette.border),
    promptBorderShimmer: rgb(palette.borderStrong),
    text: rgb(palette.text),
    inverseText: rgb(palette.base),
    inactive: rgb(palette.textDim),
    subtle: rgb(palette.border),
    suggestion: rgb(palette.sky),
    remember: rgb(palette.core),
    background: rgb(palette.base),
    success: rgb(palette.green),
    error: rgb(palette.red),
    warning: rgb(palette.orange),
    warningShimmer: lighten(palette.orange, 0.3),
    diffAdded: mix(palette.base, palette.green, 0.2),
    diffRemoved: mix(palette.base, palette.red, 0.2),
    diffAddedDimmed: mix(palette.base, palette.green, 0.12),
    diffRemovedDimmed: mix(palette.base, palette.red, 0.12),
    diffAddedWord: mix(palette.base, palette.green, 0.5),
    diffRemovedWord: mix(palette.base, palette.red, 0.5),
    diffAddedWordDimmed: mix(palette.base, palette.green, 0.35),
    diffRemovedWordDimmed: mix(palette.base, palette.red, 0.35),
    red_FOR_SUBAGENTS_ONLY: rgb(palette.red),
    blue_FOR_SUBAGENTS_ONLY: rgb(palette.core),
    green_FOR_SUBAGENTS_ONLY: rgb(palette.green),
    yellow_FOR_SUBAGENTS_ONLY: rgb(palette.orange),
    purple_FOR_SUBAGENTS_ONLY: rgb(palette.purple),
    orange_FOR_SUBAGENTS_ONLY: rgb(palette.orange),
    pink_FOR_SUBAGENTS_ONLY: rgb(palette.sky),
    cyan_FOR_SUBAGENTS_ONLY: rgb(palette.cyan),
    professionalBlue: rgb(palette.sky),
    rainbow_red: rgb(palette.red),
    rainbow_orange: rgb(palette.orange),
    rainbow_yellow: rgb(palette.orange),
    rainbow_green: rgb(palette.green),
    rainbow_blue: rgb(palette.core),
    rainbow_indigo: rgb(palette.deep),
    rainbow_violet: rgb(palette.purple),
    rainbow_red_shimmer: lighten(palette.red, 0.35),
    rainbow_orange_shimmer: lighten(palette.orange, 0.35),
    rainbow_yellow_shimmer: lighten(palette.orange, 0.25),
    rainbow_green_shimmer: lighten(palette.green, 0.35),
    rainbow_blue_shimmer: lighten(palette.core, 0.35),
    rainbow_indigo_shimmer: lighten(palette.deep, 0.35),
    rainbow_violet_shimmer: lighten(palette.purple, 0.35),
    clawd_body: rgb(palette.core),
    clawd_background: rgb(palette.base),
    userMessageBackground: rgb(palette.panel),
    bashMessageBackgroundColor: rgb(palette.surface),
    memoryBackgroundColor: rgb(palette.panel),
    rate_limit_fill: rgb(palette.core),
    rate_limit_empty: rgb(palette.borderStrong),
  },
};

export const buildZhipuTweakccConfig = (): TweakccConfig => ({
  ccVersion: '',
  ccInstallationPath: null,
  lastModified: new Date().toISOString(),
  changesApplied: false,
  hidePiebaldAnnouncement: true,
  settings: {
    themes: [theme, ...DEFAULT_THEMES],
    thinkingVerbs: {
      format: '{}... ',
      verbs: [
        'Analyzing',
        'Processing',
        'Synthesizing',
        'Evaluating',
        'Calculating',
        'Reasoning',
        'Inferring',
        'Deducing',
        'Validating',
        'Optimizing',
        'Structuring',
        'Resolving',
        'Mapping',
        'Correlating',
        'Integrating',
        'Refining',
        'Finalizing',
      ],
    },
    thinkingStyle: {
      updateInterval: 100,
      phases: ['⦿', '⦾', '◉', '○'],
      reverseMirror: false,
    },
    userMessageDisplay: {
      format: formatUserMessage(getUserLabel()),
      styling: ['bold'],
      foregroundColor: 'default',
      backgroundColor: 'default',
      borderStyle: 'topBottomBold',
      borderColor: rgb(palette.core),
      paddingX: 1,
      paddingY: 0,
      fitBoxToContent: true,
    },
    inputBox: {
      removeBorder: true,
    },
    misc: {
      showTweakccVersion: false,
      showPatchesApplied: false,
      expandThinkingBlocks: true,
      enableConversationTitle: true,
      hideStartupBanner: true,
      hideCtrlGToEditPrompt: true,
      hideStartupClawd: true,
      increaseFileReadLimit: true,
    },
    toolsets: [
      {
        name: 'zhipu',
        allowedTools: '*',
        blockedTools: ZHIPU_BLOCKED_TOOLS,
      },
    ],
    defaultToolset: 'zhipu',
    planModeToolset: 'zhipu',
  },
});
