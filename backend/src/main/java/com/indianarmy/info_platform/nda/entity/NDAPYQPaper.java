package com.indianarmy.info_platform.nda.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NDAPYQPaper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer year;

    private String session; // NDA I / NDA II

    private String pdfUrl;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private NDASubject subject;
}