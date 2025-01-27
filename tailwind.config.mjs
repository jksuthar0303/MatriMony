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
      screens: {
        sm: '340px',
        md: '650px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        bebas: ['Bebas Neue', 'serif'],
        londrina: ['Londrina Outline', 'serif'],
        playwrite:['Playwrite IN','serif'],
        playwritevn:['Playwrite VN', 'serif']
      },
    },
  },
  plugins: [],
   // Add custom spinner style here
   safelist: [
    'loader', // Ensure that this class gets purged correctly
  ],
};
