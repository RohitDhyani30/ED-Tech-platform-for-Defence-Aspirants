package com.indianarmy.info_platform.nda.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NDAExamInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 3000)
    private String introduction;

    private String conductingBody;

    private String officialWebsite;

    private String examFrequency;
}