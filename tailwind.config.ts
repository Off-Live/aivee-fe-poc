import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', 'class'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito)'],
      },
      colors: {
        main: 'var(--bg-main)',
        emphasis: 'var(--bg-emphasis)',
        default: 'var(--bg)',
        subtle: 'var(--bg-subtle)',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        inverted: 'var(--bg-inverted)',
        info: 'var(--bg-info)',
        success: 'var(--bg-success)',
        attention: 'var(--bg-attention)',
        error: 'var(--bg-error)',
        'dark-error': 'var(--bg-dark-error)',
        'border-emphasis': 'var(--border-emphasis)',
        border: 'hsl(var(--border))',
        'border-subtle': 'var(--border-subtle)',
        'border-booker': 'var(--border-booker)',
        'border-muted': 'var(--border-muted)',
        'border-error': 'var(--border-error)',
        'border-focus': 'var(--border-focus)',
        'text-emphasis': 'var(--text-emphasis)',
        text: 'var(--text-default)',
        'text-subtle': 'var(--text-subtle)',
        'text-muted': 'var(--text-muted)',
        'text-inverted': 'var(--text-inverted)',
        'text-info': 'var(--text-info)',
        'text-success': 'var(--text-success)',
        'text-attention': 'var(--text-attention)',
        'text-error': 'var(--text-error)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
