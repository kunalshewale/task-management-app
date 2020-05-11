import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import {
  getInitialData,
  addList,
  deleteList,
  addTask,
  deleteTask,
  updateTaskLists,
} from "../../apiCalls";
import TaskBoardStyle from "./TaskBoardStyle";
import TaskList from "../TaskList";
import AddListAndTask from "../AddListAndTask";

class TaskBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskLists: getInitialData(),
      open: false,
    };
    this.draggedTask = null;
  }

  onAddList(title) {
    this.setState({
      taskLists: addList(title),
    });
  }

  onDeleteList(listNum) {
    this.setState({
      taskLists: deleteList(listNum),
      open: true,
    });
  }

  onAddTask(title, listNumber) {
    this.setState({
      taskLists: addTask(title, listNumber),
    });
  }

  onDeleteTask(listNum, taskId) {
    this.setState({
      taskLists: deleteTask(listNum, taskId),
    });
  }

  onDragStart = (e, listRef) => {
    this.draggedTask = {
      taskId: e.currentTarget.id,
      listRef,
    };
  };

  onDragOver = (e) => {
    e.preventDefault();
  };

  onDrop = (e, listNum) => {
    this.setState({
      taskLists: updateTaskLists(listNum, this.draggedTask),
    });
    this.draggedTask = null;
  };

  handleModalStatus(open) {
    this.setState({
      open,
    });
  }

  showDeleteConfirmation(listNum, taskId, callBack) {
    this.handleModalStatus(true);
    this.deleteData = {
      listNum,
      taskId,
      callBack,
    };
  }

  handleDelete() {
    this[this.deleteData.callBack](
      this.deleteData.listNum,
      this.deleteData.taskId
    );
    this.handleModalStatus(false);
    this.deleteData = null;
  }

  render() {
    const { classes } = this.props;
    const TaskListsView = this.state.taskLists.map((listItem, index) => (
      <TaskList
        {...listItem}
        onAdd={(title, listNumber) => this.onAddTask(title, listNumber)}
        onDelete={(listNum, taskId) =>
          this.showDeleteConfirmation(listNum, taskId, "onDeleteTask")
        }
        onDeleteList={(listNum) =>
          this.showDeleteConfirmation(listNum, "", "onDeleteList")
        }
        onDragStart={(e, fromList) => this.onDragStart(e, `${listItem.id}`)}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e, listNum) => {
          this.onDrop(e, `${listItem.id}`);
        }}
        key={`List_${index}`}
      />
    ));
    return (
      <Grid container spacing={2}>
        <AddListAndTask
          classes={classes}
          addList
          onAdd={(title) => this.onAddList(title)}
        />
        {TaskListsView}
        <Dialog
          open={this.state.open}
          onClose={() => this.handleModalStatus(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleModalStatus(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => this.handleDelete()}
              color="primary"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}

export default withStyles(TaskBoardStyle)(TaskBoard);
