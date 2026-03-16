package com.indianarmy.info_platform.nda.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NDAStudyResourceResponse {

    private Long id;
    private String title;
    private String description;
    private String url;
    private String resourceType;
    private String subjectName;

}