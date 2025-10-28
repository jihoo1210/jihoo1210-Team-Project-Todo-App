import { useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  IconButton,
  Typography,
  Box,
  Paper,
  Chip,
  Fade,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function TodoItem({ todo, onToggle, onRemove, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function save() {
    if (draft.trim()) {
      onEdit(todo.id, draft.trim());
      setIsEditing(false);
    }
  }

  function cancel() {
    setDraft(todo.text);
    setIsEditing(false);
  }

  return (
    <Fade in timeout={300}>
      <Paper
        elevation={todo.completed ? 1 : 3}
        sx={{
          mb: 2,
          borderRadius: 2,
          background: todo.completed
            ? "rgba(255, 255, 255, 0.02)"
            : "rgba(255, 255, 255, 0.05)",
          border: "1px solid",
          borderColor: todo.completed
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(187, 134, 252, 0.2)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            borderColor: todo.completed
              ? "rgba(255, 255, 255, 0.2)"
              : "#bb86fc",
            transform: "translateY(-1px)",
            boxShadow: todo.completed
              ? "0 4px 12px rgba(0, 0, 0, 0.1)"
              : "0 8px 25px rgba(187, 134, 252, 0.2)",
          },
        }}
      >
        <ListItem sx={{ p: 2 }}>
          <ListItemIcon sx={{ minWidth: 48 }}>
            <IconButton
              onClick={() => onToggle(todo.id)}
              sx={{
                color: todo.completed ? "#4caf50" : "text.secondary",
                "&:hover": {
                  color: todo.completed ? "#66bb6a" : "#bb86fc",
                },
              }}
            >
              {todo.completed ? (
                <CheckCircleIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
            </IconButton>
          </ListItemIcon>

          {isEditing ? (
            <Box sx={{ flex: 1, mr: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") save();
                  if (e.key === "Escape") cancel();
                }}
                autoFocus
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    background: "rgba(255, 255, 255, 0.08)",
                  },
                }}
              />
            </Box>
          ) : (
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "text.secondary" : "text.primary",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      flex: 1,
                      "&:hover": {
                        color: todo.completed ? "text.primary" : "#bb86fc",
                      },
                    }}
                    onDoubleClick={() => setIsEditing(true)}
                  >
                    {todo.text}
                  </Typography>
                  {todo.completed && (
                    <Chip
                      label="완료"
                      size="small"
                      sx={{
                        bgcolor: "#4caf50",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                      }}
                    />
                  )}
                </Box>
              }
            />
          )}

          <ListItemSecondaryAction>
            <Box sx={{ display: "flex", gap: 1 }}>
              {isEditing ? (
                <>
                  <IconButton
                    onClick={save}
                    disabled={!draft.trim()}
                    sx={{
                      color: "#4caf50",
                      "&:hover": { bgcolor: "rgba(76, 175, 80, 0.1)" },
                    }}
                  >
                    <SaveIcon />
                  </IconButton>
                  <IconButton
                    onClick={cancel}
                    sx={{
                      color: "#ff9800",
                      "&:hover": { bgcolor: "rgba(255, 152, 0, 0.1)" },
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton
                    onClick={() => setIsEditing(true)}
                    sx={{
                      color: "#bb86fc",
                      "&:hover": { bgcolor: "rgba(187, 134, 252, 0.1)" },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => onRemove(todo.id)}
                    sx={{
                      color: "#f44336",
                      "&:hover": { bgcolor: "rgba(244, 67, 54, 0.1)" },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </Box>
          </ListItemSecondaryAction>
        </ListItem>
      </Paper>
    </Fade>
  );
}
