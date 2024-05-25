import { createTheme } from "@mui/material";

const font = "'Lexend', sans-serif";

const mediaQueryTheme = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#000000",
      contrastText: "white",
    },
    background: {
      default: "#000000",
    },
    colors: {
      darkblue: "#364570ff",
      lightgreen: "#9cbec6ff",
    },
  },
  typography: {
    fontFamily: font,
    h3: {
      [mediaQueryTheme.breakpoints.down("sm")]: {
        fontSize: "2rem",
      },
    },
    h4: {
      [mediaQueryTheme.breakpoints.down("sm")]: {
        fontSize: "1.75rem",
      },
    },
  },
});

export default theme;