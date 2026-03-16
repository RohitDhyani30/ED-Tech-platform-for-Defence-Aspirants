package com.indianarmy.info_platform.ssb.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SSBResourceResponse {

    private Long id;
    private String title;
    private String description;
    private String url;
    private String resourceType;

}