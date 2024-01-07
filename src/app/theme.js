import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    info: {
      main: "#1A73E8",
      focus: "#1662C4",
    },

    success: {
      main: "#4CAF50",
      focus: "#67bb6a",
    },

    warning: {
      main: "#fb8c00",
      focus: "#fc9d26",
    },

    error: {
      main: "#F44335",
      focus: "#f65f53",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440
    }
  }
})