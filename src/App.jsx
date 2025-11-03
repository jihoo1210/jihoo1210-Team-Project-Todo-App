import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Layout/Header.jsx';
import TodoList from './pages/TodoList.jsx';
import LoginAndRegister from './pages/LoginAndRegister.jsx';

//Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});



//App
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <LoginAndRegister />
      <TodoList />
    </ThemeProvider>
  );
}

export default App;