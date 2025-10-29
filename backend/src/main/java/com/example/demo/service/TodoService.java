package com.example.demo.service;

import com.example.demo.dto.TodoDto;
import com.example.demo.dto.UserDto;
import com.example.demo.entity.Todo;
import com.example.demo.entity.User;
import com.example.demo.repository.TodoRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class TodoService {

    private final UserRepository userRepository;
    private final TodoRepository todoRepository;

    public List<TodoDto> index(Long id) {
        log.info("id: {}", id);
        if(id == null || !userRepository.existsById(id)) throw new IllegalArgumentException("잘못된 회원정보입니다. 다시 로그인하세요.");
        User target = userRepository.findById(id).orElse(null);
        return target.getTodos().stream().map( todo -> TodoDto.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .memo(todo.getMemo())
                .important(todo.isImportant())
                .createdDate(todo.getCreatedDate())
                .lastModifiedDate(todo.getLastModifiedDate())
                .build()).toList();
    }

    @Transactional
    public TodoDto create(Long userId, TodoDto dto) {
        if(userId == null || dto == null || !userRepository.existsById(userId)) throw new IllegalArgumentException("잘못된 회원정보입니다. 다시 로그인하세요.");
        User writer = userRepository.findById(userId).orElse(null);
        Todo todo = Todo.builder()
                .title(dto.getTitle())
                .memo(dto.getMemo())
                .user(writer)
                .important(dto.isImportant())
                .build();
        log.info("todo: {}", todo);
        Todo created = todoRepository.save(todo);
        log.info("created: {}", created);
        return TodoDto.builder()
                .id(created.getId())
                .title(created.getTitle())
                .memo(created.getMemo())
                .important(created.isImportant())
                .complete(false)
                .createdDate(created.getCreatedDate())
                .lastModifiedDate(created.getLastModifiedDate())
                .build();
    }

    @Transactional
    public TodoDto update(Long userId, TodoDto dto, Long todoId) {
        isExistsUserAndTodoAndValidation(userId, todoId);
        if(dto == null) throw new IllegalArgumentException("잘못된 회원정보입니다. 다시 로그인하세요.");
        Todo target = todoRepository.findById(todoId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);
        if(target.getUser() != user) throw new RuntimeException("존재하지 않는 게시글입니다.");
        target.patch(dto);
        return TodoDto.builder()
                .id(target.getId())
                .title(target.getTitle())
                .memo(target.getMemo())
                .important(target.isImportant())
                .complete(target.isComplete())
                .createdDate(target.getCreatedDate())
                .lastModifiedDate(target.getLastModifiedDate())
                .build();
    }

    @Transactional
    public TodoDto delete(Long userId, Long todoId) {
        isExistsUserAndTodoAndValidation(userId, todoId);
        Todo target = todoRepository.findById(todoId).orElse(null);
        todoRepository.delete(target);
        return TodoDto.builder()
                .id(target.getId())
                .title(target.getTitle())
                .memo(target.getMemo())
                .important(target.isImportant())
                .createdDate(target.getCreatedDate())
                .lastModifiedDate(target.getLastModifiedDate())
                .build();
    }

    private void isExistsUserAndTodoAndValidation(Long userId, Long todoId) {
        log.info("userId: {}, todoId: {}", userId, todoId);
        if(userId == null || !userRepository.existsById(userId) || !todoRepository.existsById(todoId)) throw new IllegalArgumentException("잘못된 회원정보입니다. 다시 로그인하세요.");
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("잘못된 회원정보입니다. 다시 로그인하세요."));
        User todoUser = todoRepository.findById(todoId).orElseThrow(() -> new IllegalArgumentException("잘못된 회원정보입니다. 다시 로그인하세요.")).getUser();
        if(user != todoUser) throw new IllegalArgumentException("잘못된 회원정보입니다. 다시 로그인하세요.");
    }
}