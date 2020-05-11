const TaskBoardStyle = (theme) => ({
  addListBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 0.5rem",
  },
  addListBtn: {
    background: theme.palette.secondary,
  },
  addListForm: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  addListFormInputContainer: {
    flexGrow: "1",
    flexBasis: "0",
    margin: "0 0.5rem",
  },
  addListFormActions: {
    flexGrow: "1",
    flexBasis: "0",
    margin: "0 0.5rem",
  },
  addListFormBtn: {
    height: "2.5rem",
    minWidth: "8rem",
    flexGrow: "1",
    flexBasis: "0",
    margin: "0 0.5rem",
    [theme.breakpoints.down("sm")]: {
      margin: "0.5rem 0.5rem 0.5rem 0",
    },
  },
  addListFormPaper: {
    width: "100%",
    padding: "0.5rem 1rem",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
});

export default TaskBoardStyle;
