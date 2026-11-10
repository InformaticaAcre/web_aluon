import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./frontend/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#af101a",
        "primary-container": "#d32f2f",
        "primary-fixed": "#ffdad6",
        "primary-fixed-dim": "#ffb3ac",
        "inverse-primary": "#ffb3ac",
        "on-primary": "#ffffff",
        "on-primary-container": "#fff2f0",
        "on-primary-fixed": "#410003",
        "on-primary-fixed-variant": "#930010",
        "surface-tint": "#ba1a20",

        secondary: "#5f5e5e",
        "secondary-container": "#e4e2e1",
        "secondary-fixed": "#e4e2e1",
        "secondary-fixed-dim": "#c8c6c6",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#656464",
        "on-secondary-fixed": "#1b1c1c",
        "on-secondary-fixed-variant": "#474747",

        tertiary: "#575858",
        "tertiary-container": "#6f7070",
        "tertiary-fixed": "#e3e2e2",
        "tertiary-fixed-dim": "#c6c6c6",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#f5f5f4",
        "on-tertiary-fixed": "#1a1c1c",
        "on-tertiary-fixed-variant": "#464747",

        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",

        surface: "#f9f9f9",
        "surface-bright": "#f9f9f9",
        "surface-dim": "#dadada",
        "surface-variant": "#e2e2e2",
        "surface-container": "#eeeeee",
        "surface-container-low": "#f3f3f3",
        "surface-container-high": "#e8e8e8",
        "surface-container-highest": "#e2e2e2",
        "surface-container-lowest": "#ffffff",

        "on-surface": "#1a1c1c",
        "on-surface-variant": "#5b403d",
        "inverse-surface": "#2f3131",
        "inverse-on-surface": "#f1f1f1",

        background: "#f9f9f9",
        "on-background": "#1a1c1c",

        outline: "#8f6f6c",
        "outline-variant": "#e4beba",

        // Aliases used in the app
        "muted-text": "#5f5e5e",
      },
      fontFamily: {
        sans: ["Manrope Variable", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        h2: ["Roboto", "system-ui", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 32px -4px rgba(26, 28, 28, 0.10)",
      },
    },
  },
  plugins: [forms],
} satisfies Config;
