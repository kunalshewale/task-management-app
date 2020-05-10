import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
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

  onDeleteTask(taskId, listNum) {
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

  render() {
    const { classes } = this.props;
    const TaskListsView = this.state.taskLists.map((listItem, index) => (
      <TaskList
        {...listItem}
        onAdd={(taskText, listNumber) => this.onAddTask(taskText, listNumber)}
        onDelete={(taskId, listNum) => this.onDeleteTask(taskId, listNum)}
        onDeleteList={(listNum) => this.onDeleteList(listNum)}
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
        {/* <div className={classes.addListBtnContainer}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.addListBtn}
            startIcon={<i className="material-icons">add</i>}
          >
            Add List
          </Button>
        </div> */}
        <AddListAndTask
          classes={classes}
          addList
          onAdd={(title) => this.onAddList(title)}
        />
        {TaskListsView}
      </Grid>
    );
  }
}

export default withStyles(TaskBoardStyle)(TaskBoard);
