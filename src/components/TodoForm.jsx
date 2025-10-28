import { useState } from "react";
import { Box, TextField, Button, Paper, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function submit(e) {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  }

  return (
    <Paper
      elevation={4}
    >
      <Box
        component="form"
        onSubmit={submit}
        sx={{
          
          flexDirection: { xs: "column", sm: "row" }, // 작은 화면에서는 세로, 큰 화면에서는 가로
          gap: 2,
          alignItems: { xs: "stretch", sm: "center" }, // 작은 화면에서는 stretch, 큰 화면에서는 center
        }}
      >
        <TextField
          autoFocus
          fullWidth
          variant="outlined"
          placeholder="새로운 할 일을 입력하세요..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CreateIcon color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              background: "rgba(255, 255, 255, 0.08)",
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.2)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(187, 134, 252, 0.5)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#bb86fc",
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<AddIcon />}
          disabled={!text.trim()}
          sx={{
            borderRadius: 2,
            background: "linear-gradient(45deg, #bb86fc, #985eff)",
            "&:hover": {
              background: "linear-gradient(45deg, #985eff, #7c4dff)",
            },
            "&:disabled": {
              background: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          추가
        </Button>
      </Box>
    </Paper>
  );
}
