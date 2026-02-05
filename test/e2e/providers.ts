/**
 * Shared Provider Configurations for E2E Tests
 */

export const PROVIDERS = [
  {
    key: 'zai',
    name: 'Zai Cloud',
    apiKey: 'test-zai-key',
    expectedThemeId: 'zai-carbon',
    expectedSplashStyle: 'zai',
    colorCode: '\\x1b[38;5;220m', // Gold
  },
  {
    key: 'minimax',
    name: 'MiniMax Cloud',
    apiKey: 'test-minimax-key',
    expectedThemeId: 'minimax-pulse',
    expectedSplashStyle: 'minimax',
    colorCode: '\\x1b[38;5;203m', // Coral/salmon red
  },
  {
    key: 'zhipu',
    name: 'Zhipu AI',
    apiKey: 'test-zhipu-key',
    expectedThemeId: 'zhipu-intelligence',
    expectedSplashStyle: 'zhipu',
    colorCode: '\\x1b[38;5;33m', // Zhipu blue
  },
  {
    key: 'openrouter',
    name: 'OpenRouter',
    apiKey: 'test-openrouter-key',
    expectedThemeId: 'openrouter-teal',
    expectedSplashStyle: 'openrouter',
    colorCode: '\\x1b[38;5;43m', // Teal
  },
  {
    key: 'ccrouter',
    name: 'Claude Code Router',
    apiKey: '', // Optional for ccrouter
    expectedThemeId: 'ccrouter-sky',
    expectedSplashStyle: 'ccrouter',
    colorCode: '\\x1b[38;5;39m', // Sky blue
  },
];
