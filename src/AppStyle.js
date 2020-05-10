import { makeStyles } from "@material-ui/core/styles";

const AppStyle = makeStyles((theme) => ({
  app: {
    background: theme.palette.background.default,
  },
  appHeader: {
    background: theme.palette.primary.main,
    maxHeight: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    fontSize: "1rem",
    fontWeight: "bold",
    padding: "0 1rem",
    color: theme.palette.background.default,
  },
  appContent: {
    background: theme.palette.background.default,
    flexGrow: "1",
    width: "100%",
    margin: "0 auto",
    padding: "0 1rem",
  },
  boardContainer: {
    background: theme.palette.background.default,
    padding: "1rem 0",
    color: theme.palette.text.secondary,
  },
}));

export default AppStyle;
