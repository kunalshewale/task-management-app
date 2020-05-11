let taskManagement = {
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

const getInitialData = () =>
  localStorage.getItem("taskLists")
    ? JSON.parse(localStorage.getItem("taskLists"))
    : taskManagement.taskLists;

const updateTaskManagementData = (updatedTaskListData) => {
  taskManagement = updatedTaskListData;
  localStorage.setItem(
    "taskLists",
    JSON.stringify(updatedTaskListData.taskLists)
  );
};

const addList = (title) => {
  const updatedTaskLists = { ...taskManagement };
  const newList = {
    id: new Date().valueOf(),
    title,
    cards: [],
  };
  updatedTaskLists.taskLists.push(newList);
  updateTaskManagementData(updatedTaskLists);
  return updatedTaskLists.taskLists;
};

const deleteList = (listNum) => {
  const updatedTaskLists = { ...taskManagement };
  const indexOfList = updatedTaskLists.taskLists.findIndex(
    (list) => +list.id === +listNum
  );
  updatedTaskLists.taskLists.splice(indexOfList, 1);
  updateTaskManagementData(updatedTaskLists);
  return updatedTaskLists.taskLists;
};

const addTask = (title, listNumber) => {
  const updatedTaskLists = { ...taskManagement };
  const newTask = {
    title,
    listNumber,
    taskId: new Date().valueOf(),
  };
  updatedTaskLists.taskLists[listNumber].cards.push(newTask);
  updateTaskManagementData(updatedTaskLists);
  return updatedTaskLists.taskLists;
};

const deleteTask = (listNum, taskId) => {
  const updatedTaskLists = { ...taskManagement };
  const cardsArray = updatedTaskLists.taskLists[listNum].cards;
  const indexOfCard = cardsArray.findIndex((card) => +card.taskId === +taskId);
  updatedTaskLists.taskLists[listNum].cards.splice(indexOfCard, 1);
  updateTaskManagementData(updatedTaskLists);
  return updatedTaskLists.taskLists;
};

const updateTaskLists = (listNum, droppedTask) => {
  const updatedTaskLists = { ...taskManagement };
  const cardsArray = updatedTaskLists.taskLists[droppedTask.listRef].cards;
  const taskCard = cardsArray.find((card) => {
    return +card.taskId === +droppedTask.taskId;
  });
  const indexOfCard = cardsArray.findIndex(
    (card) => +card.taskId === +droppedTask.taskId
  );
  updatedTaskLists.taskLists[droppedTask.listRef].cards.splice(indexOfCard, 1);
  updatedTaskLists.taskLists[listNum].cards.push({
    ...taskCard,
    listNumber: +listNum,
  });
  updateTaskManagementData(updatedTaskLists);
  return updatedTaskLists.taskLists;
};

export {
  getInitialData,
  addList,
  deleteList,
  addTask,
  deleteTask,
  updateTaskLists,
};
