package com.indianarmy.info_platform.nda.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NDAStudyResource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    private String url;

    private String resourceType; // PDF / Video / Website

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private NDASubject subject;
}