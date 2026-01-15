/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: '#FFD700',
                maroon: '#800000',
                cream: '#FFFDD0',
                'soft-pink': '#FFB6C1',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                hand: ['"Dancing Script"', 'cursive'],
            },
        },
    },
    plugins: [],
}
