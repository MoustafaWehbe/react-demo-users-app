import { useState, useRef } from "react";
import UserCard from "./UserCard";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return data.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  }));
};

const UserList = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const nameInputRef = useRef(null);
  const [showAdditionalResources, setShowAdditionalResources] = useState(false);

  const {
    data: users,
    isLoading,
    error,
    refetch,
    isFetching, // Background fetching indicator
    isPreviousData, // Pagination helper
  } = useQuery({
    queryKey: ["users"], // Unique key for caching
    queryFn: fetchUsers,
    // These can be overridden from defaults
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <>
      <h1>User Directory {selectedUser}</h1>
      <input
        type="text"
        placeholder="Search users..."
        ref={nameInputRef}
        id="search-input"
      />

      <button
        onClick={() => setShowAdditionalResources(!showAdditionalResources)}
      >
        Toggle Additional Resources
      </button>

      {users &&
        users.map((user) => (
          <UserCard
            key={user.id}
            name={user.name}
            email={user.email}
            phone={user.phone}
            selected={selectedUser === user.name}
            handleSelect={() => setSelectedUser(user.name)}
          />
        ))}
    </>
  );
};

export default UserList;
