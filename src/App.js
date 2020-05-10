import React from "react";
import Grid from "@material-ui/core/Grid";
import AppStyle from "./AppStyle";
import TaskBoard from "./components/TaskBoard";

const App = () => {
  const classes = AppStyle();
  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <p>Task Management</p>
      </header>
      <Grid container>
        <Grid item xs={12} className={classes.appContent}>
          <div className={classes.boardContainer}>
            <TaskBoard />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
