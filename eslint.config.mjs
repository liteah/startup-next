import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'

const nextConfig = {
  plugins: {
    '@next/next': nextPlugin,
  },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,
    'node/prefer-global/buffer': 'off',
    'node/prefer-global/console': 'off',
    'node/prefer-global/process': 'off',
    'node/prefer-global/url-search-params': 'off',
    'node/prefer-global/url': 'off',
    'node/prefer-global/text-decoder': 'off',
    'node/prefer-global/text-encoder': 'off',
  },
}

export default antfu(
  {
    react: true,
  },
  nextConfig,
)
