import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core";
// eslint-disable-next-line no-restricted-imports
import { bgBG, esES } from "@material-ui/core/locale";

const theme = createTheme(
  {
    typography: {
      fontFamily: ["Poppins"].join(","),
      fontSize: 16,
    },

    palette: {
      primary: {
        main: "#17c191",
      },
      secondary: {
        main: "#3783e7",
      },
      error: {
        main: "#f018a6",
      },
    },
    props: {
      MuiButtonBase: {
        disableRipple: false,
      },
      MuiPopover: {
        elevation: 1,
      },
    },
  },
  bgBG,
  esES
);

export function MaterialThemeProvider(props) {
  const { children } = props;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
