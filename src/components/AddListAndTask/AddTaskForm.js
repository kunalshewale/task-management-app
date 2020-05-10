import React from "react";
import { Button, TextField } from "@material-ui/core";

const AddTaskForm = ({
  classes,
  onSubmit,
  setEditing,
  addTaskInput,
  isError,
}) => (
  <form className={classes.addTaskForm} onSubmit={onSubmit}>
    <TextField
      required
      id="outlined-required"
      label="Task Title"
      variant="outlined"
      classes={{
        root: classes.addTaskFormInput,
      }}
      inputRef={addTaskInput}
      error={isError}
      helperText={isError ? <span>Please enter valid title...</span> : ""}
    />
    <div className={classes.addTaskFormActions}>
      <Button
        variant="contained"
        color="default"
        className={classes.addTaskFormBtn}
        onClick={() => {
          addTaskInput.current.value = "";
          setEditing(false, false);
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={onSubmit}
        className={classes.addTaskFormBtn}
      >
        Add Task
      </Button>
    </div>
  </form>
);

export default AddTaskForm;
