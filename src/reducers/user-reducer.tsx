function userReducer(state, action) {
  console.log("Reducer called with:", action);

  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, { ...action.payload, id: Date.now() }],
      };

    case "SELECT_USER":
      return {
        ...state,
        selectedUserId: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    default:
      return state;
  }
}

// Initial state
const initialState = {
  users: [],
  selectedUserId: null,
  loading: false,
};

export { userReducer, initialState };
