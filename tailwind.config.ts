import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FBFAF8',
        surface: '#FFFFFF',
        mist: '#F3F1EE',
        line: '#E6E2DC',
        ink: '#0E1525',
        'ink-soft': '#3A4458',
        muted: '#6B7487',
        'logo-gray': '#8A92A3',
        iris: '#5B4BFF',
        'iris-tint': '#EEEBFF',
        positive: '#12A26B',
        'positive-tint': '#E6F6EE',
        caution: '#D98B06',
        'caution-tint': '#FFF4DB',
        negative: '#E5484D',
        'negative-tint': '#FDECEC',
        'g-cream': '#FFF1E4',
        'g-apricot': '#FF9E7A',
        'g-lilac': '#B39DFF',
        'g-glacier': '#8FD3FF',
        'g-butter': '#FFE08A',
        'g-seafoam': '#9EECD0',
      },
      fontFamily: {
        display: ['"Instrument Sans Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        panel: '20px',
        frame: '28px',
        cta: '32px',
      },
      boxShadow: {
        panel:
          '0 1px 2px rgba(14,21,37,0.06), 0 12px 32px -8px rgba(14,21,37,0.16), 0 40px 80px -24px rgba(76,56,160,0.22)',
        lift: '0 2px 4px rgba(14,21,37,0.05), 0 24px 48px -12px rgba(14,21,37,0.18)',
        card: '0 1px 2px rgba(14,21,37,0.04), 0 8px 24px -12px rgba(14,21,37,0.10)',
      },
    },
  },
  plugins: [],
} satisfies Config;
