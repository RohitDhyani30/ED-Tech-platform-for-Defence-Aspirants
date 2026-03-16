package com.indianarmy.info_platform.nda.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NDAPYQPaperResponse {

    private Long id;
    private Integer year;
    private String session;
    private String pdfUrl;
    private String subjectName;

}