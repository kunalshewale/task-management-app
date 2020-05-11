const addTaskList = (title) => (dispatch, getState) => {
  const updatedTaskLists = [...getState().taskManagement.taskLists];
  const newList = {
    id: new Date().valueOf(),
    title,
    cards: [],
  };
  updatedTaskLists.push(newList);
  dispatch({
    type: "ADD_TASK_LIST",
    payload: updatedTaskLists,
  });
};

const deleteTaskList = (listNum) => (dispatch, getState) => {
  const updatedTaskLists = [...getState().taskManagement.taskLists];
  const indexOfList = updatedTaskLists.findIndex(
    (list) => +list.id === +listNum
  );
  updatedTaskLists.splice(indexOfList, 1);
  console.log("Updated task list >>> ", updatedTaskLists);
  dispatch({
    type: "DELETE_TASK_LIST",
    payload: updatedTaskLists,
  });
};

const addTask = ({ title, listNumber }) => (dispatch, getState) => {
  const updatedTaskLists = [...getState().taskManagement.taskLists];
  const newTask = {
    title,
    listNumber,
    taskId: new Date().valueOf(),
  };
  updatedTaskLists[listNumber].cards.push(newTask);
  dispatch({
    type: "ADD_TASK",
    payload: updatedTaskLists,
  });
};

const deleteTask = (listNum, taskId) => (dispatch, getState) => {
  const updatedTaskLists = [...getState().taskManagement.taskLists];
  const cardsArray = updatedTaskLists[listNum].cards;
  const indexOfCard = cardsArray.findIndex((card) => +card.taskId === +taskId);
  updatedTaskLists[listNum].cards.splice(indexOfCard, 1);
  dispatch({
    type: "DELETE_TASK",
    payload: updatedTaskLists,
  });
};

const updateTaskLists = (payload) => (dispatch) => {
  dispatch({
    type: "UPDATE_TASK_LISTS",
    payload,
  });
};

export { addTaskList, deleteTaskList, addTask, deleteTask, updateTaskLists };
