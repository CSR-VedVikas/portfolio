/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#141210",
        ink: "#F4F2ED",
        muted: "#98938A",
        signal: "#C8411E",
        "signal-bright": "#E85A38",
        hairline: "rgba(244, 242, 237, 0.14)",
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
