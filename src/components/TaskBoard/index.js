import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addTaskList,
  deleteTaskList,
  addTask,
  deleteTask,
  updateTaskLists,
} from "../../actions/TaskManagement";
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
import TaskBoardStyle from "./TaskBoardStyle";
import TaskList from "../TaskList";
import AddListAndTask from "../AddListAndTask";

class TaskBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.draggedTask = null;
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
    const droppedTask = this.draggedTask;
    const taskLists = [...this.props.taskLists];
    const cardsArray = taskLists[droppedTask.listRef].cards;
    const taskCard = cardsArray.find((card) => {
      return +card.taskId === +droppedTask.taskId;
    });
    const indexOfCard = cardsArray.findIndex(
      (card) => +card.taskId === +droppedTask.taskId
    );
    taskLists[droppedTask.listRef].cards.splice(indexOfCard, 1);
    taskLists[listNum].cards.push({
      ...taskCard,
      listNumber: +listNum,
    });
    this.props.updateTaskLists(taskLists);
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
    this.props[this.deleteData.callBack](
      this.deleteData.listNum,
      this.deleteData.taskId
    );
    this.handleModalStatus(false);
    this.deleteData = null;
  }

  render() {
    const { classes } = this.props;
    const TaskListsView = this.props.taskLists.map((listItem, index) => (
      <TaskList
        {...listItem}
        onAdd={(title, listNumber) => this.props.addTask({ title, listNumber })}
        onDelete={(listNum, taskId) =>
          this.showDeleteConfirmation(listNum, taskId, "deleteTask")
        }
        onDeleteList={(listNum) =>
          this.showDeleteConfirmation(listNum, "", "deleteTaskList")
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
          onAdd={(title) => this.props.addTaskList(title)}
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

const mapStateToProps = (state) => ({
  taskLists: state.taskManagement.taskLists,
});

const mapDispatchToProps = (dispatch) => ({
  addTaskList: (payload) => dispatch(addTaskList(payload)),
  deleteTaskList: (payload) => dispatch(deleteTaskList(payload)),
  addTask: (payload) => dispatch(addTask(payload)),
  deleteTask: (payload) => dispatch(deleteTask(payload)),
  updateTaskLists: (payload) => dispatch(updateTaskLists(payload)),
});

export default withStyles(TaskBoardStyle)(
  connect(mapStateToProps, mapDispatchToProps)(TaskBoard)
);
