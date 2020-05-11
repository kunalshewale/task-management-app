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
import TaskBoardStyle from "./TaskBoardStyle";
import TaskList from "../TaskList";
import AddListAndTask from "../AddListAndTask";

class TaskBoard extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("taskLists")) {
      const taskListsFromLS = localStorage.getItem("taskLists");
      const parsedTaskListsFromLS = JSON.parse(taskListsFromLS);
      this.state = { taskLists: parsedTaskListsFromLS };
    } else {
      this.state = {
        taskLists: [
          {
            title: "To Do",
            id: 0,
            cards: [
              {
                title: "default task card 1",
                description: "default task card 1 description",
                listNumber: 0,
                taskId: 0,
              },
              {
                title: "default task card 2",
                description: "default task card 2 description",
                listNumber: 0,
                taskId: 1,
              },
              {
                title: "default task card 3",
                description: "default task card 3 description",
                listNumber: 0,
                taskId: 2,
              },
            ],
          },
          {
            title: "In Progress",
            id: 1,
            cards: [
              {
                title: "default task card 1",
                description: "default task card 1 description",
                listNumber: 1,
                taskId: 0,
              },
              {
                title: "default task card 2",
                description: "default task card 2 description",
                listNumber: 1,
                taskId: 1,
              },
            ],
          },
          {
            title: "Done",
            id: 2,
            cards: [
              {
                title: "default task card 1",
                description: "default task card 1 description",
                listNumber: 2,
                taskId: 0,
              },
              {
                title: "default task card 2",
                description: "default task card 2 description",
                listNumber: 2,
                taskId: 1,
              },
            ],
          },
        ],
        open: false,
      };

      localStorage.setItem("taskLists", JSON.stringify(this.state.taskLists));
    }
  }

  onAddList(title) {
    const taskListsFromLS = localStorage.getItem("taskLists");
    const parsedTaskListsFromLS = JSON.parse(taskListsFromLS);
    const newList = {
      id: new Date().valueOf(),
      title,
      cards: [],
    };
    parsedTaskListsFromLS.push(newList);
    this.setState({
      taskLists: parsedTaskListsFromLS,
    });
    localStorage.setItem("taskLists", JSON.stringify(parsedTaskListsFromLS));
  }

  onDeleteList(listNum) {
    const taskListsFromLS = localStorage.getItem("taskLists");
    const parsedTaskListsFromLS = JSON.parse(taskListsFromLS);
    const indexOfList = parsedTaskListsFromLS.findIndex(
      (list) => +list.id === +listNum
    );
    parsedTaskListsFromLS.splice(indexOfList, 1);
    this.setState({
      taskLists: parsedTaskListsFromLS,
      open: true,
    });
    localStorage.setItem("taskLists", JSON.stringify(parsedTaskListsFromLS));
  }

  onAddTask(title, listNumber) {
    const taskListsFromLS = localStorage.getItem("taskLists");
    const parsedTaskListsFromLS = JSON.parse(taskListsFromLS);
    const newTask = {
      title,
      listNumber,
      taskId: new Date().valueOf(),
    };
    parsedTaskListsFromLS[listNumber].cards.push(newTask);
    this.setState({
      taskLists: parsedTaskListsFromLS,
    });
    localStorage.setItem("taskLists", JSON.stringify(parsedTaskListsFromLS));
  }

  onDeleteTask(listNum, taskId) {
    const taskListsFromLS = localStorage.getItem("taskLists");
    const parsedTaskListsFromLS = JSON.parse(taskListsFromLS);
    const cardsArray = parsedTaskListsFromLS[listNum].cards;
    const indexOfCard = cardsArray.findIndex(
      (card) => +card.taskId === +taskId
    );
    parsedTaskListsFromLS[listNum].cards.splice(indexOfCard, 1);
    this.setState({
      taskLists: parsedTaskListsFromLS,
    });
    localStorage.setItem("taskLists", JSON.stringify(parsedTaskListsFromLS));
  }

  onDragStart = (e, listRef) => {
    const draggedTask = {
      taskId: e.currentTarget.id,
      listRef,
    };

    localStorage.setItem("draggedTask", JSON.stringify(draggedTask));
  };

  onDragOver = (e) => {
    e.preventDefault();
  };

  onDrop = (e, listNum) => {
    const droppedTask = localStorage.getItem("draggedTask");
    const taskListsFromLS = localStorage.getItem("taskLists");
    const parsedTaskListsFromLS = JSON.parse(taskListsFromLS);
    const parsedDraggedTask = JSON.parse(droppedTask);
    const cardsArray = parsedTaskListsFromLS[parsedDraggedTask.listRef].cards;
    const taskCard = cardsArray.find((card) => {
      return +card.taskId === +parsedDraggedTask.taskId;
    });
    const indexOfCard = cardsArray.findIndex(
      (card) => +card.taskId === +parsedDraggedTask.taskId
    );
    parsedTaskListsFromLS[parsedDraggedTask.listRef].cards.splice(
      indexOfCard,
      1
    );
    parsedTaskListsFromLS[listNum].cards.push({
      ...taskCard,
      listNumber: +listNum,
    });
    this.setState({
      taskLists: parsedTaskListsFromLS,
    });
    localStorage.setItem("taskLists", JSON.stringify(parsedTaskListsFromLS));
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
