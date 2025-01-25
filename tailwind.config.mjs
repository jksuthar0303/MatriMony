/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        bebas: ['Bebas Neue', 'serif'],
        londrina: ['Londrina Outline', 'serif']
      },
    },
  },
  plugins: [],
   // Add custom spinner style here
   safelist: [
    'loader', // Ensure that this class gets purged correctly
  ],
};
