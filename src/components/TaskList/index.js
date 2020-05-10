import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import { Grid, IconButton } from "@material-ui/core";
import TaskListStyle from "./TaskListStyle";
import TaskCard from "../TaskCard";
import AddListAndTask from "../AddListAndTask";

class TaskList extends PureComponent {
  render() {
    const {
      classes,
      id,
      title,
      onDragStart,
      cards,
      onDragOver,
      onDrop,
      onAdd,
      onDelete,
      onDeleteList,
    } = this.props;
    return (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        classes={{
          root: classes.list,
        }}
      >
        <div onDragOver={onDragOver} onDrop={onDrop}>
          <div className={classes.listHeader}>
            <span>{title}</span>
            <IconButton
              className={classes.deleteListBtn}
              onClick={() => onDeleteList(id)}
            >
              <i className="material-icons">delete</i>
            </IconButton>
          </div>
          <div className={classes.listContent}>
            <div className={classes.taskContainer}>
              {cards.map((card, index) => (
                <TaskCard
                  {...card}
                  onDragStart={onDragStart}
                  key={`Card_${id}_${index}`}
                  onDelete={onDelete}
                />
              ))}
            </div>
            <AddListAndTask
              classes={classes}
              listNum={id}
              onAdd={onAdd}
              addList={false}
            />
          </div>
        </div>
      </Grid>
    );
  }
}

export default withStyles(TaskListStyle)(TaskList);
