//Todo 리스트 작성 폼
import React from "react";
import { TextField, Button } from "@mui/material";

export default function TodoForm({ title, memo, setTitle, setMemo, createTodo }) {
  return (
    <form onSubmit={createTodo}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Memo"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained">
        추가
      </Button>
    </form>
  );
}