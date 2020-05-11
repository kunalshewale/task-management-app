const initialState = {
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

const updateTaskLists = (state, payload) =>
  Object.assign({}, state, { taskLists: [...payload] });

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK_LIST":
      return updateTaskLists(state, action.payload);
    case "DELETE_TASK_LIST":
      return updateTaskLists(state, action.payload);
    case "ADD_TASK":
      return updateTaskLists(state, action.payload);
    case "DELETE_TASK":
      return updateTaskLists(state, action.payload);
    case "UPDATE_TASK_LISTS":
      return updateTaskLists(state, action.payload);
    default:
      return state;
  }
};
