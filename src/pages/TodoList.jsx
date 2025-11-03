import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { call } from "../api/ApiService";
import TodoForm from "./TodoForm"; // import UI (UI 따로 관리 생성)
/*여기*/
//call 기본 import 로 사용하고 있었음


//todolist (리스트)
export default function TodoList() {
    const [todos, setTodos] = useState([]); //투두목록
    const [title, setTitle] = useState(""); //제목
    const [memo, setMemo] = useState(""); //메모
    const [loading, setLoading] = useState(false); //로딩
    const [error, setError] = useState("") // 에러

    //투두 목록 로드
    useEffect(() => {
        load();
    }, []);

//loading (로딩)
async function load() {
    // 비동기
    setLoading(true); //지금 불러오는 중 로딩표시 켜기
    try {
        const data = await call("/todo", "GET", null).catch(data => {
            setError(data.error)
        }); //기다림, call로 todo목록 get 요청
        setTodos(data.result || data || []);
    } finally {
        setLoading(false); //에러시 무조건 로딩표시 끄기
    }
}


//createTodo (투두생성)
async function createTodo(e) {
    e.preventDefault(); //새로고침 방지
    setLoading(true)
    try {
        /* 여기 */
        //중복방지 안하고 변수로 바로 생성 됬었음
    //제목 //메모 //중요 //완료
    const body = { title, memo, important: false, complete: false };
        const created = await call("/todo", "POST", body).catch(data => {
            setError(data.error)}
        );
        setTodos((prev) => [created.result || created, ...prev]); //펼쳐서 이어 붙이기
        setTitle("");
        setMemo("");
    } catch (error) {
    console.log(error?.error || "Todo 생성에 실패하였습니다."); //에러 메세지
} finally {
    setLoading(false); //로딩끄기
}
}

// updateTodo (투두수정)
// /todo/{id}

async function updateTodo(e, updated) {
    e.preventDefault()
    setLoading(true)
    try {
        const res = await call(`/todo/${updated.id}`, "PATCH", updated).catch(data => {
            setError(data.error)}
        );
        load()
    } catch (error) {
        console.log(error?.error || "Todo 수정에 실패하였습니다.");
    } finally {
    setLoading(false); //로딩끄기
    }
}


// deleteTodo (투두삭제)
// /todo/{id}

async function deleteTodo(e, deleted) {
    e.preventDefault()
    setLoading(true)
    try {
  // call() 실행 중 발생한 에러는 내부 catch가 먼저
        const res = await call(`/todo/${deleted.id}`, "DELETE")
    .catch(data => setError(data.error)); // Promise 내부 에러 처리

  // load() 호출
    load();
    } catch (error) {
    // await 전체 블록에서 throw된 예외가 있으면 이 catch로
    console.log(error?.error || "Todo 삭제 실패");
    } finally {
    setLoading(false);
    }
}
// 필터
  function showImportant() {
    const importantList = todos.filter((todo) => todo.important === true);
    setTodos(importantList);
  }

  function showComplete() {
    const completeList = todos.filter((todo) => todo.complete === true);
    setTodos(completeList);
  }

  function showAll() {
    load(); // 전체 목록 다시 로드
  }

return (
    <Box>
      <Typography variant="h5">Todo List</Typography>
      
      {/* 필터 버튼들 */}
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={showAll}
        >
          전체
        </Button>
        <Button 
          variant="outlined" 
          color="warning" 
          onClick={showImportant}
        >
          중요한 할일
        </Button>
        <Button 
          variant="outlined" 
          color="success" 
          onClick={showComplete}
        >
          완료된 할일
        </Button>
      </Box>

      <TodoForm
        title={title}
        memo={memo}
        setTitle={setTitle}
        setMemo={setMemo}
        createTodo={createTodo}
      />
    </Box>
);
}