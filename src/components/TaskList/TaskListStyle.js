const TaskListStyle = (theme) => ({
  list: {
    background: theme.palette.background.default,
    maxHeight: "25rem",
  },
  listHeader: {
    backgroundColor: theme.palette.primary.main,
    height: "2rem",
    lineHeight: "2rem",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    fontSize: "1.250rem",
    fontWeight: "bold",
    padding: "0 1rem",
    color: theme.palette.background.default,
    "&:hover": {
      "& $deleteListBtn": {
        visibility: "visible",
      },
    },
  },
  listContent: {
    background: theme.palette.background.default,
    flexGrow: "1",
    width: "100%",
    height: "calc(100% - 2rem)",
    margin: "0 auto",
    padding: "0.5rem 1rem",
    border: "1px solid rgba(119, 119, 119, 0.25)",
    borderTop: "none",
  },
  deleteListBtn: {
    padding: "0.250rem 0.5rem",
    color: theme.palette.background.default,
    cursor: "pointer",
    visibility: "hidden",
  },
  taskContainer: {
    height: "calc(100% - 3rem)",
    overflowY: "auto",
  },
  addTaskContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "0.5rem 0",
  },
  addTaskBtn: {
    fontSize: "0.750rem",
    padding: "0.250rem 0.5rem",
    width: "100%",
  },
  addTaskForm: {
    width: "100%",
  },
  addTaskFormInput: {
    width: "100%",
    marginBottom: "0.5rem",
  },
  addTaskFormActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addTaskFormBtn: {
    padding: "0.250rem 1.5rem",
  },
});

export default TaskListStyle;
