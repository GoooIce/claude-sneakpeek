import type { OverlayMap, PromptPackKey } from './types.js';
import { sanitizeOverlayMap } from './sanitize.js';
import { buildZaiOverlays } from './providers/zai.js';
import { buildMinimaxOverlays } from './providers/minimax.js';
import { buildZhipuOverlays } from './providers/zhipu.js';

const buildProviderOverlays = (provider: PromptPackKey): OverlayMap => {
  if (provider === 'zai') return buildZaiOverlays();
  if (provider === 'zhipu') return buildZhipuOverlays();
  return buildMinimaxOverlays();
};

export const resolveOverlays = (provider: PromptPackKey): OverlayMap => {
  const base = buildProviderOverlays(provider);
  return sanitizeOverlayMap(base);
};
