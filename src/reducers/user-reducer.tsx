type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type UserState = {
  users: User[];
  selectedUserId: number | null;
  loading: boolean;
  showAdditionalResources: boolean;
};

type UserAction =
  | { type: "ADD_USER"; payload: Omit<User, "id"> }
  | { type: "SELECT_USER"; payload: number | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USERS"; payload: User[] }
  | { type: "DELETE_USER"; payload: number }
  | { type: "TOGGLE_RESOURCES" };

function userReducer(state: UserState, action: UserAction): UserState {
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

    case "TOGGLE_RESOURCES":
      return {
        ...state,
        showAdditionalResources: !state.showAdditionalResources,
      };

    default:
      return state;
  }
}

const initialState: UserState = {
  users: [],
  selectedUserId: null,
  loading: false,
  showAdditionalResources: false,
};

export { userReducer, initialState };
export type { User, UserAction, UserState };
