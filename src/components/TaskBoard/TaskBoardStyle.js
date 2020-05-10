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
    width: "35%",
  },
  addListFormInput: {
    width: "70%",
  },
  addListFormActions: {
    width: "25%",
  },
  addListFormBtn: {
    height: "3.5rem",
    width: "100%",
  },
});

export default TaskBoardStyle;
