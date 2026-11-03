/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F4F2ED",
        ink: "#141414",
        muted: "#6B6862",
        signal: "#C8411E",
        hairline: "rgba(20, 20, 20, 0.15)",
      },
      fontFamily: {
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ['"Inter Tight"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        measure: "65ch",
      },
    },
  },
};
