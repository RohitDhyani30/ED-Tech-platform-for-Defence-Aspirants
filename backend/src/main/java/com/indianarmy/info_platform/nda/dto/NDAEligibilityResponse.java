package com.indianarmy.info_platform.nda.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NDAEligibilityResponse {

    private Long id;
    private Integer minAge;
    private Integer maxAge;
    private String educationRequirement;
    private String nationality;
    private String maritalStatus;

}