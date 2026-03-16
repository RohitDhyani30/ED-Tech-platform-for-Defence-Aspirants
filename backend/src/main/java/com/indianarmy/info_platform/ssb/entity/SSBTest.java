package com.indianarmy.info_platform.ssb.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SSBTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String testName;

    @Column(length = 3000)
    private String description;

    @Column(length = 2000)
    private String tips;

    @ManyToOne
    @JoinColumn(name = "stage_id")
    private SSBStage stage;
}