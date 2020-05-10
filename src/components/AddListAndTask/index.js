import React, { PureComponent } from "react";
import { Button, Modal } from "@material-ui/core";
import AddListForm from "./AddListForm";
import AddTaskForm from "./AddTaskForm";

class AddListAndTask extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      error: false,
    };
    this.setEditing = this.setEditing.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addTaskInput = React.createRef();
  }

  onSubmit(event) {
    event.preventDefault();
    const title = this.addTaskInput.current.value.trim();
    if (!title) {
      this.setState({
        error: true,
      });
      return;
    }
    const listNumber = this.props.listNum;
    if (title && this.props.onAdd) {
      this.props.onAdd(title, listNumber);
    }
    this.addTaskInput.current.value = "";
    this.setEditing(false, false);
  }

  setEditing(editing, error) {
    this.setState({
      editing,
      error: error === undefined ? this.state.error : error,
    });
  }

  render() {
    const { classes, addList } = this.props;
    return (
      <React.Fragment>
        {addList ? (
          <div className={classes.addListBtnContainer}>
            {!this.state.editing ? (
              <Button
                variant="contained"
                color="secondary"
                className={classes.addListBtn}
                startIcon={<i className="material-icons">add</i>}
                onClick={() => this.setEditing(true)}
              >
                Add List
              </Button>
            ) : (
              <AddListForm
                classes={classes}
                onSubmit={this.onSubmit}
                setEditing={this.setEditing}
                addTaskInput={this.addTaskInput}
                isError={this.state.error}
              />
            )}
          </div>
        ) : (
          <div className={classes.addTaskContainer}>
            {!this.state.editing ? (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<i className="material-icons">add</i>}
                classes={{
                  root: classes.addTaskBtn,
                }}
                onClick={() => this.setEditing(true)}
              >
                Add Task
              </Button>
            ) : (
              <AddTaskForm
                classes={classes}
                onSubmit={this.onSubmit}
                setEditing={this.setEditing}
                addTaskInput={this.addTaskInput}
                isError={this.state.error}
              />
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default AddListAndTask;
