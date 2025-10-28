package com.example.demo.dto;

import com.example.demo.entity.Todo;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDto {
    private Long id;

    @Email
    @NotBlank
    private String email;

    private String username;

    private String nickname;

    @NotBlank
    private String password;

    private List<TodoDto> todos;

    private String token;
}
