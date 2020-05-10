const TaskCardStyle = (theme) => ({
  root: {
    marginBottom: "0.5rem",
  },
  cardHeader: {
    background: theme.palette.background.header,
    padding: "0.250rem 0.5rem",
    "&:hover": {
      "& $deleteCardBtn": {
        visibility: "visible",
      },
    },
  },
  cardHeaderTitle: {
    fontSize: "1rem",
    color: theme.palette.text.primary,
  },
  cardHeaderAction: {
    marginTop: "0",
  },
  deleteCardBtn: {
    padding: "0.250rem 0.5rem",
    cursor: "pointer",
    color: theme.palette.text.primary,
    visibility: "hidden",
  },
});

export default TaskCardStyle;
