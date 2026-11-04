import { useEffect, useReducer, useRef } from "react";
import UserCard from "./UserCard";
import { useQuery } from "@tanstack/react-query";
import { initialState, userReducer, type User } from "../reducers/user-reducer";

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) throw new Error("Network response was not ok");
  const data = (await response.json()) as Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
  }>;

  return data.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  }));
};

const UserList = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { users, selectedUserId, showAdditionalResources, loading } = state;
  const nameInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // If another component requests the same query during that 5 minutes, it uses the cached data without triggering a refetch.
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_USERS", payload: data });
    }
    dispatch({ type: "SET_LOADING", payload: isLoading });
  }, [data, isLoading]);

  const selectedUser = users.find((user) => user.id === selectedUserId) ?? null;

  return (
    <>
      <h1>User Directory {selectedUser ? `- ${selectedUser.name}` : ""}</h1>

      <div style={{ marginBottom: "12px" }}>
        <input
          type="text"
          placeholder="Search users..."
          ref={nameInputRef}
          id="search-input"
        />
      </div>

      <button onClick={() => dispatch({ type: "TOGGLE_RESOURCES" })}>
        {showAdditionalResources ? "Hide" : "Show"} Additional Resources
      </button>

      <button
        onClick={() => refetch()}
        style={{ marginLeft: "12px" }}
        disabled={loading}
      >
        Refresh list
      </button>

      {loading && <p>Loading users...</p>}
      {isFetching && <p>Refreshing users in the background...</p>}
      {error && <p>Something went wrong while loading users.</p>}

      {showAdditionalResources && (
        <div style={{ margin: "12px 0" }}>
          <p>Additional resources are enabled for this list.</p>
        </div>
      )}

      {users.length > 0 &&
        users.map((user) => (
          <UserCard
            key={user.id}
            name={user.name}
            email={user.email}
            phone={user.phone}
            selected={selectedUserId === user.id}
            handleSelect={() =>
              dispatch({ type: "SELECT_USER", payload: user.id })
            }
          />
        ))}
    </>
  );
};

export default UserList;
