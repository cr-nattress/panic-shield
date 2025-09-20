import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        foreground: 'var(--text)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        card: 'var(--card)',
        primary: 'var(--primary)',
        'primary-text': 'var(--primary-text)',
        secondary: 'var(--secondary)',
        danger: 'var(--danger)',
        success: 'var(--success)',
      },
    },
  },
  plugins: [],
}
export default config