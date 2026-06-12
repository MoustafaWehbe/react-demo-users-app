import { useTheme } from "../providers/ThemeProvider";

const Badge = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: "inline-block",
        padding: "5px 10px",
        backgroundColor: theme === "light" ? "#007bff" : "#333",
        color: theme === "light" ? "#fff" : "#000",
        borderRadius: "12px",
        fontSize: "12px",
        marginTop: "10px",
      }}
    >
      New
    </div>
  );
};

export default Badge;
