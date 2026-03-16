package com.indianarmy.info_platform.ssb.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SSBOverview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 3000)
    private String introduction;

    @Column(length = 2000)
    private String purpose;

    @Column(length = 2000)
    private String selectionProcessSummary;

    private String officialWebsite;
}