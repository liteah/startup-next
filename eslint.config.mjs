import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'

const nextConfig = {
  plugins: {
    '@next/next': nextPlugin,
  },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,
  },
}

export default antfu(
  {
    react: true,
  },
  nextConfig,
)
