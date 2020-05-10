import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7289da",
    },
    secondary: {
      main: "#2c2f33",
    },
    background: {
      default: "#f9fafc",
      header: "rgba(119, 119, 119, 0.30)",
    },
  },
});

export default theme;
