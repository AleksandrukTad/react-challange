/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { green, orange } from "@material-ui/core/colors";
import { Color } from "@material-ui/core";

declare module "@material-ui/core/styles/createPalette" {
  interface PaletteOptions {
    primaryVariants: PaletteColorOptions;
    green: PaletteColorOptions;
    orange: PaletteColorOptions;
  }

  interface Palette {
    primaryVariants: Color;
    green: PaletteColor;
    orange: PaletteColor;
  }
}

const defaultTheme = createMuiTheme();

const text = {
  primary: "#0a1f44",
  secondary: "#fff"
};

/**
 * Please check the default theme values before making any changes
 * https://material-ui.com/customization/default-theme
 */
export const theme = createMuiTheme({
  ...defaultTheme,
  palette: {
    background: {
      default: "#fafafa"
    },
    primary: {
      dark: "#216044",
      light: "#79CA7C",
      main: "#22922D",
      contrastText: defaultTheme.palette.common.white
    },
    // It doesn't seem possible to add variants to default palettes due to type errors
    primaryVariants: {
      dark: "#00620c",
      light: "#79ca7c",
      main: "#22922D",
      contrastText: defaultTheme.palette.common.white
    },
    secondary: {
      dark: "#0a1f44",
      light: "#49618b",
      main: "#183868",
      contrastText: defaultTheme.palette.common.white
    },
    error: {
      dark: "#c20911",
      light: "#ee716f",
      main: "#dd2727",
      contrastText: defaultTheme.palette.common.white
    },
    green: { main: green[600] },
    orange: { main: orange[600] },
    text
  },
  typography: {
    fontFamily: "sans-serif",

    h1: {
      fontSize: "4rem",
      fontWeight: 700,
      [defaultTheme.breakpoints.down("sm")]: {
        fontSize: "3.5rem"
      }
    },
    h2: {
      fontSize: "3rem",
      fontWeight: 700,
      [defaultTheme.breakpoints.down("sm")]: {
        fontSize: "2rem"
      }
    },
    body1: {
      fontSize: "1.125rem",
      fontWeight: 400
    },
    body2: {
      fontSize: "1.5rem",
      fontWeight: 600
    },
    button: {
      textTransform: "none",
      fontSize: "1.125rem",
      fontWeight: 200
    }
  },
  overrides: {
    MuiCard: {
      root: {
        minWidth: "350px"
      }
    },
    MuiCardContent: {
      root: {
        padding: "16px 16px 0 16px",
        "&:last-child": {
          paddingBottom: 0
        }
      }
    },
    MuiIcon: {
      fontSizeSmall: {
        fontSize: "24px"
      }
    },
    MuiFormLabel: {
      root: {
        color: text.primary
      }
    }
  }
});
