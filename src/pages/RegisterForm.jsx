//로그인과 회원가입

import React, { useState } from 'react';
import { Box, Stack, TextField, Button, IconButton, InputAdornment, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { call } from '../api/ApiService';

export default function RegisterForm({ onRegistered }) {
  const [registerData, setRegisterData] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); //기본 브라우저 동작 방지

    //registerData (회원가입 데이터)로 임의 작성했는데 바꿔주세요
    // 필수항목 없을 때
    if (!registerData.name || !registerData.nickname || !registerData.email || !registerData.password) {
      setError(error?.error || '모든 필수 항목을 입력해주세요.');
      return;
    }

    // 비밀번호 틀렸을 때
    if (registerData.password !== registerData.confirmPassword) {
      setError(error?.error || '비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    setError('');

    // 회원가입
    try {
      await call('/auth/signup', 'POST', {
        username: registerData.name,
        nickname: registerData.nickname,
        email: registerData.email,
        password: registerData.password,
      });

      setSuccess('회원가입이 완료되었습니다! 로그인 탭으로 이동하세요.'); //setTimeout 으로 1초뒤에 실행시킬건데 지워도 되구요
      setTimeout(() => {
        onRegistered?.();
        setSuccess('');
      }, 1000);
    } catch (error) {
      setError(error?.error || '회원가입에 실패했습니다.');
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
      <Box component="form" onSubmit={handleRegister}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="이름"
            value={registerData.name}
            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            required
          />

          <TextField
            fullWidth
            label="이메일"
            type="email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            required
          />

          <TextField
            fullWidth
            label="닉네임"
            value={registerData.nickname}
            onChange={(e) => setRegisterData({ ...registerData, nickname: e.target.value })}
            required
          />

          <TextField
            fullWidth
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
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

          <TextField
            fullWidth
            label="비밀번호 확인"
            type={showConfirmPassword ? 'text' : 'password'}
            value={registerData.confirmPassword}
            onChange={(e) =>
              setRegisterData({ ...registerData, confirmPassword: e.target.value })
            }
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

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
            {loading ? '가입 중...' : '회원가입'}
          </Button>
        </Stack>
      </Box>
    </>
  );
}
