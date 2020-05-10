import React from "react";
import { Button, TextField } from "@material-ui/core";

const AddListForm = ({
  classes,
  onSubmit,
  setEditing,
  addTaskInput,
  isError,
}) => (
  <form className={classes.addListForm} onSubmit={onSubmit}>
    <TextField
      required
      id="outlined-required"
      label="List Title"
      variant="outlined"
      classes={{
        root: classes.addListFormInput,
      }}
      inputRef={addTaskInput}
      error={isError}
      helperText={isError ? <span>Please enter valid title...</span> : ""}
    />
    <div className={classes.addListFormActions}>
      <Button
        variant="contained"
        color="secondary"
        onClick={onSubmit}
        className={classes.addListFormBtn}
      >
        Add Task
      </Button>
    </div>
  </form>
);

export default AddListForm;
