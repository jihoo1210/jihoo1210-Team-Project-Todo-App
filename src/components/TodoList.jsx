import { List, Typography, Box } from "@mui/material";
import TodoItem from "./TodoItem.jsx";

export default function TodoList({ todos, onToggle, onRemove, onEdit }) {
  if (todos.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4, opacity: 0.7 }}>
        <Typography variant="body1" color="text.secondary">
          비어 있음
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: "100%" }}>
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </List>
  );
}
