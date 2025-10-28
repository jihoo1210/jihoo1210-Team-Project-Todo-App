import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Avatar,
  InputAdornment,
  Tabs,
  Tab,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function UserLogin({ user, onLogin, onLogout }) {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tabValue, setTabValue] = useState(0); // 0: 로그인, 1: 회원가입
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    } catch {
      return [];
    }
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // 탭 변경시 입력 필드 초기화
    setName("");
    setNickname("");
    setEmail("");
    setPassword("");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (name.trim() && nickname.trim() && email.trim() && password.trim()) {
      // 중복 닉네임 체크
      if (registeredUsers.some((user) => user.nickname === nickname.trim())) {
        alert("이미 사용중인 닉네임입니다.");
        return;
      }

      // 중복 이메일 체크
      if (registeredUsers.some((user) => user.email === email.trim())) {
        alert("이미 가입된 이메일입니다.");
        return;
      }

      const newUser = {
        name: name.trim(),
        nickname: nickname.trim(),
        email: email.trim(),
        password: password.trim(),
        registerTime: Date.now(),
      };

      const updatedUsers = [...registeredUsers, newUser];
      setRegisteredUsers(updatedUsers);
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

      alert("회원가입이 완료되었습니다! 로그인해주세요.");
      setTabValue(0); // 로그인 탭으로 이동
      setName("");
      setNickname("");
      setEmail("");
      setPassword("");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      const foundUser = registeredUsers.find(
        (user) =>
          user.email === email.trim() && user.password === password.trim()
      );

      if (foundUser) {
        onLogin(foundUser.nickname);
        setEmail("");
        setPassword("");
      } else {
        alert("이메일 또는 비밀번호가 잘못되었습니다.");
      }
    }
  };

  if (user) {
    // 로그인된 상태
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 2,
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 40,
                  height: 40,
                }}
              >
                {user.nickname.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {user.nickname}님
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  환영합니다!
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<LogoutIcon />}
              onClick={onLogout}
              sx={{
                borderRadius: 2,
                borderColor: "rgba(255, 255, 255, 0.3)",
                "&:hover": {
                  borderColor: "primary.main",
                  background: "rgba(187, 134, 252, 0.1)",
                },
              }}
            >
              로그아웃
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  // 로그인되지 않은 상태
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* 탭 헤더 */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{
            mb: 3,
            "& .MuiTab-root": {
              color: "text.secondary",
              "&.Mui-selected": {
                color: "primary.main",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "primary.main",
            },
          }}
        >
          <Tab label="로그인" />
          <Tab label="회원가입" />
        </Tabs>

        {/* 로그인 폼 */}
        {tabValue === 0 && (
          <Box component="form" onSubmit={handleLogin}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                textAlign: "center",
                color: "text.primary",
              }}
            >
              로그인
            </Typography>
            <TextField
              fullWidth
              type="email"
              variant="outlined"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  background: "rgba(255, 255, 255, 0.05)",
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
            <TextField
              fullWidth
              type="password"
              variant="outlined"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  background: "rgba(255, 255, 255, 0.05)",
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
              fullWidth
              variant="contained"
              startIcon={<LoginIcon />}
              disabled={!email.trim() || !password.trim()}
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
              로그인
            </Button>
          </Box>
        )}

        {/* 회원가입 폼 */}
        {tabValue === 1 && (
          <Box component="form" onSubmit={handleRegister}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                textAlign: "center",
                color: "text.primary",
              }}
            >
              회원가입
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  background: "rgba(255, 255, 255, 0.05)",
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
            <TextField
              fullWidth
              variant="outlined"
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  background: "rgba(255, 255, 255, 0.05)",
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
            <TextField
              fullWidth
              type="email"
              variant="outlined"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  background: "rgba(255, 255, 255, 0.05)",
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
            <TextField
              fullWidth
              type="password"
              variant="outlined"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  background: "rgba(255, 255, 255, 0.05)",
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
              fullWidth
              variant="contained"
              startIcon={<PersonAddIcon />}
              disabled={
                !name.trim() ||
                !nickname.trim() ||
                !email.trim() ||
                !password.trim()
              }
              sx={{
                borderRadius: 2,
                background: "linear-gradient(45deg, #03dac6, #00a896)",
                "&:hover": {
                  background: "linear-gradient(45deg, #00a896, #007b68)",
                },
                "&:disabled": {
                  background: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              회원가입
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
