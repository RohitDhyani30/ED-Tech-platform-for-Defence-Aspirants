package com.indianarmy.info_platform.ssb.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SSBOverviewResponse {

    private Long id;
    private String introduction;
    private String purpose;
    private String selectionProcessSummary;
    private String officialWebsite;

}