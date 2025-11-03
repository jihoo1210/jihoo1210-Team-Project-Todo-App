
//로그인 창과 회원가입 전환하는 컴포넌트
import React, { useState } from 'react';
import { Box, Container, Paper, Typography, Tabs, Tab } from '@mui/material';
import { SitemarkIcon } from '../components/icons/CustomIcons.jsx';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function LoginAndRegister({ onLogin }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #F8FAFC 0%, #E2E8F0 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
            border: '1px solid rgba(180, 192, 211, 0.16)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* 헤더 */}
          <Box textAlign="center" mb={4}>
            <SitemarkIcon sx={{ mb: 2 }} />
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                background: 'linear-gradient(90deg, #4876EF 0%, #00D3AB 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700
              }}
            >
              Todo Manager
            </Typography>
            <Typography variant="body1" color="text.secondary">
              스마트한 할 일 관리 시스템
            </Typography>
          </Box>

          {/* 탭 */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              mb: 2,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem'
              }
            }}
          >
            <Tab label="로그인" />
            <Tab label="회원가입" />
          </Tabs>

          {/* 로그인 패널 */}
          <TabPanel value={tabValue} index={0}>
            <LoginForm onLoggedIn={onLogin} />
          </TabPanel>

          {/* 회원가입 패널 */}
          <TabPanel value={tabValue} index={1}>
            <RegisterForm onRegistered={() => setTabValue(0)} />
          </TabPanel>

        </Paper>
      </Container>
    </Box>
  );
}