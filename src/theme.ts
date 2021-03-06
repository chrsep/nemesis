// example theme.js
import { Theme } from "theme-ui"

export default {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    monospace: "Inter, Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: "#000",
    background: "#fff",
    primary: "black",
    secondary: "#30c",
    muted: "#f6f6f6",
    border: "rgba(0,0,0,0.2)",
    darkBackground: "rgba(0,0,0,0.07)",

    upcoming: "#008a4e",
    live: "blue",
    past: "black",
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    a: {
      color: "inherit",
      textDecoration: "none",
      cursor: "pointer",
    },
    h1: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 5,
    },
    h2: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 4,
    },
    h3: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 3,
    },
    h4: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 2,
    },
    h5: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 1,
    },
    h6: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 0,
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    img: {
      maxWidth: "100%",
    },
  },
  cards: {
    primary: {
      borderRadius: 6,
      boxShadow:
        "0 6px 12px -2px rgba(50,50,93,.12),0 3px 7px -3px rgba(0,0,0,.15)",
      border: 1,
      borderColor: "rgba(0,0,0,0.2)",
      borderStyle: "solid",
    },
  },
  buttons: {
    primary: {
      flexShrink: 0,
      borderRadius: 6,
      boxShadow:
        "0 6px 12px -2px rgba(50,50,93,.12),0 3px 7px -3px rgba(0,0,0,.15)",
      border: 1,
      borderColor: "black",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: 1,
      "&:disabled": {
        boxShadow: "none",
        opacity: 0.4,
      },
      whiteSpace: "nowrap",
    },
    outline: {
      borderWidth: 1,
      borderStyle: "solid",
      boxShadow:
        "0 6px 12px -2px rgba(50,50,93,.12),0 3px 7px -3px rgba(0,0,0,.15)",
      borderColor: "black",
      fontWeight: "bold",
      color: "black",
      backgroundColor: "white",
      fontSize: 1,
      cursor: "pointer",
    },
  },
  forms: {
    input: {
      boxShadow:
        "0 6px 12px -2px rgba(50,50,93,.10),0 3px 7px -3px rgba(0,0,0,.12)",
      borderColor: "rgba(0,0,0,0.2)",
      borderRadius: 6,
    },
  },
} as Theme
