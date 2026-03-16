package com.indianarmy.info_platform.nda.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NDAExamInfoResponse {

    private Long id;
    private String introduction;
    private String conductingBody;
    private String officialWebsite;
    private String examFrequency;

}