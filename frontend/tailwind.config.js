export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        background: '#070b1a',
        surface: '#10182d',
        border: 'rgba(148, 163, 184, 0.2)',
        muted: '#a9b9d8',
        primary: '#f8fbff',
      },
      keyframes: {
        dash: {
          to: {
            strokeDashoffset: '-1000'
          }
        }
      },
      animation: {
        dash: 'dash 20s linear infinite'
      }
    },
  },
  plugins: [],
};
