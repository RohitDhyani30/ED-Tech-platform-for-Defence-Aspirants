package com.indianarmy.info_platform.ssb.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SSBStageResponse {

    private Long id;
    private String stageName;
    private Integer dayNumber;
    private String description;

}