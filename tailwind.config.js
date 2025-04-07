/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: "hsl(var(--background))",
          light: "hsl(30 25% 98%)",
          dark: "hsl(240 10% 10%)"
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          light: "hsl(20 15% 15%)",
          dark: "hsl(0 0% 100%)"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          light: "hsl(0 0% 100%)",
          dark: "hsl(0 0% 0%)"
        },
        primary: {
          DEFAULT: "hsl(346 99% 33%)",
          foreground: "hsl(0 0% 100%)"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          light: "hsl(30 20% 96%)",
          dark: "hsl(240 10% 10%)",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          light: "hsl(30 20% 96%)",
          dark: "hsl(240 10% 20%)",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(145 25% 35%)",
          foreground: "hsl(0 0% 100%)"
        },
        

        destructive: {
          DEFAULT: "hsl(0 97% 60%)",
          foreground: "hsl(0 0% 100%)"
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          light: "hsl(30 15% 90%)",
          dark: "hsl(240 10% 15%)"
        },
        input: {
          DEFAULT: "hsl(var(--input))",
          light: "hsl(30 15% 90%)",
          dark: "hsl(240 10% 15%)"
        },
        ring: "hsl(346 99% 33%)",
        peach: {
          100: 'rgb(255, 250, 240)',
          200: 'rgb(255, 245, 222)',
          300: 'rgb(255, 215, 178)',
          400: 'rgb(255, 200, 156)',
          500: 'rgb(255, 185, 134)',
          600: 'rgb(255, 170, 112)',
          700: 'rgb(255, 155, 90)',
          800: 'rgb(255, 140, 68)',
        },
        darkGreen: 'rgb(5, 51, 37)',
        darkerGreen: 'rgb(0, 55, 60)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'card-light': '0 8px 20px -4px rgba(87, 65, 45, 0.12), 0 6px 12px -6px rgba(87, 65, 45, 0.08)',
        'card-hover-light': '0 15px 30px -8px rgba(87, 65, 45, 0.15), 0 10px 20px -6px rgba(87, 65, 45, 0.1)',
        'card-dark': '0 10px 25px -5px rgba(255, 255, 255, 0.05), 0 8px 10px -6px rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'card-gradient': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
} 