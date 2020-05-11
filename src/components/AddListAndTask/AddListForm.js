import React from "react";
import { Button, TextField, Paper } from "@material-ui/core";

const AddListForm = ({
  classes,
  onSubmit,
  setEditing,
  addTaskInput,
  isError,
}) => (
  <form className={classes.addListForm} onSubmit={onSubmit}>
    <Paper className={classes.addListFormPaper} elevation={3}>
      <TextField
        required
        id="outlined-required"
        label="List Title"
        variant="outlined"
        classes={{
          root: classes.addListFormInputContainer,
        }}
        size="small"
        inputRef={addTaskInput}
        error={isError}
        helperText={isError ? <span>Please enter valid title...</span> : ""}
      />
      <div className={classes.addListFormActions}>
        <Button
          variant="contained"
          color="default"
          className={classes.addListFormBtn}
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
          className={classes.addListFormBtn}
        >
          Add List
        </Button>
      </div>
    </Paper>
  </form>
);

export default AddListForm;
