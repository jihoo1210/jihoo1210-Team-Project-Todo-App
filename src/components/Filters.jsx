import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Paper,
  Typography,
} from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DoneAllIcon from "@mui/icons-material/DoneAll";

export default function Filters({
  filter,
  setFilter,
  remaining,
  onClearCompleted,
}) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* 필터 버튼 그룹 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ minWidth: "fit-content" }}
          >
            필터:
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2, // 버튼들 사이 간격 증가
              "& .MuiButton-root": {
                borderRadius: 2,
                borderColor: "rgba(255, 255, 255, 0.2)",
                "&:hover": {
                  borderColor: "#bb86fc",
                  background: "rgba(187, 134, 252, 0.1)",
                },
              },
            }}
          >
            <Button
              variant={filter === "all" ? "contained" : "outlined"}
              onClick={() => setFilter("all")}
              startIcon={<AllInboxIcon />}
              size="small"
              sx={{
                borderRadius: 2,
                borderColor: "rgba(255, 255, 255, 0.2)",
                "&:hover": {
                  borderColor: "#bb86fc",
                  background: "rgba(187, 134, 252, 0.1)",
                },
                ...(filter === "all" && {
                  background: "linear-gradient(45deg, #bb86fc, #985eff)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #985eff, #7c4dff)",
                  },
                }),
              }}
            >
              전체
            </Button>
            <Button
              variant={filter === "active" ? "contained" : "outlined"}
              onClick={() => setFilter("active")}
              startIcon={<PendingActionsIcon />}
              size="small"
              endIcon={
                <Chip
                  label={remaining}
                  size="small"
                  sx={{
                    bgcolor:
                      filter === "active"
                        ? "rgba(0, 0, 0, 0.2)"
                        : "primary.main",
                    color: filter === "active" ? "white" : "black",
                    fontWeight: 600,
                  }}
                />
              }
              sx={{
                borderRadius: 2,
                borderColor: "rgba(255, 255, 255, 0.2)",
                "&:hover": {
                  borderColor: "#bb86fc",
                  background: "rgba(187, 134, 252, 0.1)",
                },
                ...(filter === "active" && {
                  background: "linear-gradient(45deg, #03dac6, #00a896)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #00a896, #007b68)",
                  },
                }),
              }}
            >
              진행중
            </Button>
            <Button
              variant={filter === "completed" ? "contained" : "outlined"}
              onClick={() => setFilter("completed")}
              startIcon={<DoneAllIcon />}
              size="small"
              sx={{
                borderRadius: 2,
                borderColor: "rgba(255, 255, 255, 0.2)",
                "&:hover": {
                  borderColor: "#bb86fc",
                  background: "rgba(187, 134, 252, 0.1)",
                },
                ...(filter === "completed" && {
                  background: "linear-gradient(45deg, #4caf50, #388e3c)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #388e3c, #2e7d32)",
                  },
                }),
              }}
            >
              완료됨
            </Button>
          </Box>
        </Box>

        {/* 완료된 항목 삭제 버튼 */}
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteSweepIcon />}
          onClick={onClearCompleted}
          size="small"
          sx={{
            borderRadius: 2,
            borderColor: "rgba(244, 67, 54, 0.5)",
            "&:hover": {
              borderColor: "#f44336",
              background: "rgba(244, 67, 54, 0.1)",
            },
          }}
        >
          완료된 항목 삭제
        </Button>
      </Box>
    </Paper>
  );
}
