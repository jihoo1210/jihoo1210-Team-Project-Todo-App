//로그인관련 함수 모음
import React, { useState } from 'react';
import {
  Box,
  Stack,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  Link,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { call } from '../api/ApiService';

export default function LoginForm({ onLoggedIn }) {
  const [loginData, setLoginData] = useState({ email: '', password: '', rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await call('/auth/signin', 'POST', {
        email: loginData.email,
        password: loginData.password,
      });

      const token = response?.token ?? response?.result?.token;
      const user = response?.user ?? response?.result?.user;

      if (token) {
        sessionStorage.setItem('ACCESS_TOKEN', token);
        setTimeout(() => {
          onLoggedIn?.(user);
        }, 1000);
      }
    } catch (err) {
      setError(err?.error || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Box component="form" onSubmit={handleLogin}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="이메일"
            type="email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required
          />

          <TextField
            fullWidth
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={loginData.rememberMe}
                  onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
                />
              }
              label="로그인 상태 유지"
            />
            <Link href="#" underline="hover" sx={{ fontSize: '0.875rem' }}>
              비밀번호 찾기
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.5,
              background: 'linear-gradient(90deg, #4876EF 0%, #00D3AB 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #3A5DC7 0%, #00B394 100%)',
              },
            }}
          >
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </Stack>
      </Box>
    </>
  );
}
