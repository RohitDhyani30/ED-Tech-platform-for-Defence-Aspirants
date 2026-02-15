package com.indianarmy.info_platform.nda.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NDAEligibility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer minAge;
    private Integer maxAge;

    @Column(length = 2000)
    private String educationRequirement;

    private String nationality;

    private String maritalStatus;
}