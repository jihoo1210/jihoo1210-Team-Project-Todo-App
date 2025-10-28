package com.example.demo.entity;


import com.example.demo.dto.TodoDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data

@EntityListeners(AuditingEntityListener.class)
@Entity(name = "todos")
public class Todo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "owner")
    private User user;

    @Column
    private String title;

    @Column
    private String memo;

    @Column
    private boolean important;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime lastModifiedDate;

    public void patch(TodoDto dto) {
        if(dto.getTitle() != null) this.title = dto.getTitle();
        if(dto.getMemo() != null) this.memo = dto.getMemo();
        if(dto.isImportant() != this.important) this.important = dto.isImportant();
    }
}
