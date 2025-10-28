package com.example.demo.controller;

import com.example.demo.dto.ResponseDto;
import com.example.demo.dto.TodoDto;
import com.example.demo.dto.UserDto;
import com.example.demo.entity.Todo;
import com.example.demo.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/todo")
public class TodoController {

    private final TodoService service;

    @GetMapping
    public ResponseEntity<?> index(@AuthenticationPrincipal Long userId) {
        try {
            log.info("id: {}", userId);
            List<TodoDto> dtos = service.index(userId);
            ResponseDto response = ResponseDto.<List<TodoDto>>builder().result(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String msg = e.getMessage();
            ResponseDto response = ResponseDto.builder().error(msg).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@AuthenticationPrincipal Long id, @RequestBody TodoDto dto) {
        try {
            log.info("id: {}, dto: {}", id, dto);
            TodoDto responseDto = service.create(id, dto);
            ResponseDto response = ResponseDto.<TodoDto>builder().result(responseDto).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String msg = e.getMessage();
            ResponseDto response = ResponseDto.builder().error(msg).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@AuthenticationPrincipal Long userId, @RequestBody TodoDto dto, @PathVariable(name = "id") Long todoId) {
        try {
            log.info("userId: {}, dto: {}", userId, dto);
            TodoDto responseDto = service.update(userId, dto, todoId);
            ResponseDto response = ResponseDto.<TodoDto>builder().result(responseDto).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String msg = e.getMessage();
            ResponseDto response = ResponseDto.builder().error(msg).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@AuthenticationPrincipal Long userId, @PathVariable(name = "id") Long todoId) {
        try {
            log.info("userId: {}, todoId: {}", userId, todoId);
            TodoDto responseDto = service.delete(userId, todoId);
            ResponseDto response = ResponseDto.<TodoDto>builder().result(responseDto).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String msg = e.getMessage();
            ResponseDto response = ResponseDto.builder().error(msg).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

}