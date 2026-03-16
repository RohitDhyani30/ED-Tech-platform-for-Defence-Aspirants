package com.indianarmy.info_platform.nda.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NDASubjectResponse {

    private Long id;
    private String name;
    private Integer totalMarks;
    private Integer durationMinutes;
    private String syllabusText;

}