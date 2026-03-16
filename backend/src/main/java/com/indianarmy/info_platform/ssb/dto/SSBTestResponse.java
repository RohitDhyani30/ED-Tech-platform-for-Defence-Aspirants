package com.indianarmy.info_platform.ssb.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SSBTestResponse {

    private Long id;
    private String testName;
    private String description;
    private String tips;
    private String stageName;

}