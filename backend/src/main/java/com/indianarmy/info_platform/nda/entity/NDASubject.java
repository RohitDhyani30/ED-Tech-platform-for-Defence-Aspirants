package com.indianarmy.info_platform.nda.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NDASubject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // Mathematics / GAT

    private Integer totalMarks;

    private Integer durationMinutes;

    @Column(length = 5000)
    private String syllabusText;
}