// apps/web/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export const content = [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}', // IMPORTANT: Adjust this path if your shared UI package is named differently or located elsewhere
];
export const darkMode = 'media';
export const theme = {
    extend: {
        backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        fontFamily: {
            sans: ['Arial', 'Helvetica', 'sans-serif'],
        },
    },
};
export const plugins = [];