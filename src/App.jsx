//react 훅 / MUI 컴포넌트/테마 유틸
import { useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Typography, Box, Paper, Fade, Grow } from "@mui/material";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import Filters from "./components/Filters.jsx";
import Sidebar from "./components/Sidebar.jsx";
import UserLogin from "./components/UserLogin.jsx";

// Material Design (darkTheme)
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bb86fc",
      light: "#d7bbff",
      dark: "#985eff",
      contrastText: "#000000",
    },
    secondary: {
      main: "#03dac6",
      light: "#66fff9",
      dark: "#00a896",
      contrastText: "#000000",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    surface: {
      main: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Noto Sans KR", sans-serif',
    h3: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

//이름 -> 판별함수
const FILTERS = {
  all: () => true,
  active: (t) => !t.completed,
  completed: (t) => t.completed,
};

export default function App() {
  // todos 상태 : 로컬스토리지에서 지연 초기화(Lazy init)
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("todos") || "[]");
    } catch {
      return [];
    }
  });

  // 현재 적용중인 필터 키
  const [filter, setFilter] = useState("all");

  // 사이드바 열림/닫힘 상태
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 사용자 로그인 상태
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  //상태 변경시 로컬스토리지 영속
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 사용자 상태 변경시 로컬스토리지 영속
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const visible = useMemo(() => todos.filter(FILTERS[filter]), [todos, filter]);
  const remaining = useMemo(() => todos.filter(FILTERS.active).length, [todos]);

  function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const todo = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [todo, ...prev]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function removeTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id, text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
    );
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter(FILTERS.active));
  }

  // 사이드바 관련 함수들
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  // 사용자 로그인/로그아웃 함수들
  const handleLogin = (nickname) => {
    const userData = {
      nickname: nickname.trim(),
      loginTime: Date.now(),
    };
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {/* 사이드바 */}
      <Sidebar
        open={sidebarOpen}
        onClose={handleSidebarClose}
        onToggle={handleSidebarToggle}
        remaining={remaining}
        user={user}
      />

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        }}
      >
        {/* 메인 컨테이너 */}
        <Container
          maxWidth="md"
          sx={{
            py: 4,
            pt: 6,
            ml: { xs: 0, sm: 0 },
            transition: "margin-left 0.3s ease",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Fade in timeout={800}>
            <Paper
              elevation={12}
              sx={{
                p: 4,
                width: "100%",
                maxWidth: "600px",
                borderRadius: 3,
                background: "rgba(30, 30, 30, 0.8)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* 헤더 */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    background: "linear-gradient(45deg, #bb86fc, #03dac6)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                  }}
                >
                  {user ? `${user.nickname}님의 Todo List` : "Todo"}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  효율적으로 작업을 관리하세요
                </Typography>
              </Box>

              {/* 사용자 로그인 */}
              <UserLogin
                user={user}
                onLogin={handleLogin}
                onLogout={handleLogout}
              />

              {/* 로그인된 사용자만 Todo 기능 사용 가능 */}
              {user ? (
                <>
                  {/* 할 일 추가 폼 */}
                  <Grow in timeout={1000}>
                    <Box
                      sx={{
                        mb: 3,
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <TodoForm onAdd={addTodo} />
                    </Box>
                  </Grow>

                  {/* 필터 */}
                  <Grow in timeout={1200}>
                    <Box sx={{ mb: 3 }}>
                      <Filters
                        filter={filter}
                        setFilter={setFilter}
                        remaining={remaining}
                        onClearCompleted={clearCompleted}
                      />
                    </Box>
                  </Grow>

                  {/* 할 일 목록 */}
                  <Grow in timeout={1400}>
                    <Box>
                      <TodoList
                        todos={visible}
                        onToggle={toggleTodo}
                        onRemove={removeTodo}
                        onEdit={editTodo}
                      />
                    </Box>
                  </Grow>
                </>
              ) : (
                /* 로그인하지 않은 사용자를 위한 안내 메시지 */
                <Grow in timeout={1000}>
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 6,
                      px: 3,
                      borderRadius: 2,
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2,
                        color: "text.secondary",
                        fontWeight: 500,
                      }}
                    >
                      🔒 로그인이 필요합니다
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Todo 기능을 사용하려면 먼저 로그인해주세요.
                    </Typography>
                    <Typography variant="body2" color="text.disabled">
                      닉네임을 입력하고 로그인 버튼을 클릭하세요.
                    </Typography>
                  </Box>
                </Grow>
              )}
            </Paper>
          </Fade>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
