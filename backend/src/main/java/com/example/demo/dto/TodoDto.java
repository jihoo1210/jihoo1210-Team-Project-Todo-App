package com.example.demo.dto;

import com.example.demo.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TodoDto {
    private Long id;
    private String title;
    private String memo;
    private boolean important;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
