import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import TaskCardStyle from "./TaskCardStyle";

const DEFAULT_TASK_TITLE = "Default Task Title...";

class TaskCard extends PureComponent {
  render() {
    const {
      classes,
      taskId,
      title,
      listNumber,
      onDelete,
      onDragStart,
    } = this.props;
    return (
      <div draggable="true" onDragStart={onDragStart} id={[taskId]}>
        <Card
          classes={{
            root: classes.root,
          }}
        >
          <CardHeader
            title={title || DEFAULT_TASK_TITLE}
            action={
              <IconButton
                className={classes.deleteCardBtn}
                onClick={() => {
                  onDelete(listNumber, taskId);
                }}
              >
                <i className="material-icons">delete</i>
              </IconButton>
            }
            classes={{
              root: classes.cardHeader,
              title: classes.cardHeaderTitle,
              action: classes.cardHeaderAction,
            }}
          />
        </Card>
      </div>
    );
  }
}

export default withStyles(TaskCardStyle)(TaskCard);
