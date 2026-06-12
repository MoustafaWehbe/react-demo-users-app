import { useState } from "react";
import Badge from "./Badge";
import { useTheme } from "../providers/ThemeProvider";

interface UserCardProps {
  name: string;
  email: string;
  phone: string;
  selected?: boolean;
  handleSelect?: () => void;
}

const UserCard = ({
  name,
  email,
  phone,
  selected,
  handleSelect,
}: UserCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { theme } = useTheme();

  return (
    <div
      style={{
        border: selected ? "2px solid blue" : "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        cursor: "pointer",
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
      onClick={handleSelect}
    >
      <h3>{name}</h3>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowDetails(!showDetails);
        }}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <>
          <p>📧 {email}</p>
          <p>📞 {phone}</p>
        </>
      )}
      <Badge />
    </div>
  );
};

export default UserCard;
