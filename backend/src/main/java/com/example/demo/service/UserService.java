package com.example.demo.service;

import com.example.demo.dto.UserDto;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository repository;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder encoder = new BCryptPasswordEncoder();

    @Transactional
    public UserDto create(UserDto dto) {
        log.info("dto: {}", dto);
        if(repository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("해당 계정이 이미 존재합니다");
        }
        User user = User.builder()
                .email(dto.getEmail())
                .username(dto.getUsername())
                .nickname(dto.getNickname())
                .password(encoder.encode(dto.getPassword()))
                .build();
        repository.save(user);
        log.info("user: {}", user);
        UserDto response = UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .build();
        log.info("response: {}", response);
        return response;
    }

    public UserDto find(UserDto dto) {
        log.info("dto: {}", dto);
        User user = repository.findByEmail(dto.getEmail());
        if(user == null) throw new IllegalArgumentException("일치하지 않는 계정이 존재하지 않습니다");
        if(!encoder.matches(dto.getPassword(), user.getPassword())) throw new IllegalArgumentException("비밀번호가 일치하지 않습니다");
        UserDto response = UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .token(tokenProvider.create(user))
                .build();
        log.info("response: {}", response);
        return response;
    }
}
