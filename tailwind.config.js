/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: "class",
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',

            accent: {
                DEFAULT: "#f05050",
                light: "theme(colors.accent / 10)"
            },

            primary: {
                DEFAULT: "#FFF2F2",
                dark: "#3A2E2E"
            },

            secondary: {
                DEFAULT: "#F1E2E2",
                dark: "#312626"
            },

            black: "#302B2B",
            white: "#FFF2F2"
        },
        borderRadius: {
            "none": "0",
            "sm": "4px",
            "md": "7px",
            "lg": "10px",
            "xl": "15px"
        },
        fontFamily: {
            sans: ["var(--font-outfit)"],
        },
        extend: {
            margin: {
                ...spacing(),
                "half-page": "calc(50vh - 50px)",
                "navbar": "104px"
            },
            padding: spacing(),

            maxWidth: width(),
            width: width(),
            maxHeight: {
                "navbar": "104px"
            },

            transitionProperty: {
                "width": "width",
            }
        }
    },
    plugins: [],
}

function spacing() {
    return {
        "xxs": "3px",
        "xs": "6px",
        "sm": "10px",
        "md": "20px",
        "lg": "30px",
        "xl": "60px",
    }
}

function width() {
    return {
        "content": "898px",
        "project-max": "280px",
        "project-min": "200px",
        "1/2": "50%",
    }
}
