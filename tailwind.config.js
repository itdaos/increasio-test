/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#13132E',
        'core': '#1D1D41',
        'accent': '#2F2F6B'
      }
    },
  },
  plugins: [
  ],
}

