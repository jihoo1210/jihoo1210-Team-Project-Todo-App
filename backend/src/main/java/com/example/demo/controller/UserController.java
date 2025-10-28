package com.example.demo.controller;

import com.example.demo.dto.ResponseDto;
import com.example.demo.dto.UserDto;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService service;

    @PostMapping("/signup")
    public ResponseEntity<?> create(@Valid @RequestBody UserDto dto, BindingResult bindingResult) {
        try {
            if(bindingResult.hasErrors() || dto.getUsername() == null || dto.getNickname() == null) throw new IllegalArgumentException("값이 공백일 수 없습니다. 또는 이메일 형식을 확인해주세요.");
            UserDto created = service.create(dto);
            ResponseDto response = ResponseDto.<UserDto>builder().result(created).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String msg = e.getMessage();
            ResponseDto response = ResponseDto.builder().error(msg).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> find(@Valid @RequestBody UserDto dto, BindingResult bindingResult) {
        try {
            if(bindingResult.hasErrors()) throw new IllegalArgumentException("값이 공백일 수 없습니다");
            UserDto found = service.find(dto);
            ResponseDto response = ResponseDto.<UserDto>builder().result(found).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String msg = e.getMessage();
            ResponseDto response = ResponseDto.builder().error(msg).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
