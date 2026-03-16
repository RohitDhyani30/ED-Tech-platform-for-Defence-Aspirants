package com.indianarmy.info_platform.nda.repository;

import com.indianarmy.info_platform.nda.entity.NDAStudyResource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NDAStudyResourceRepository extends JpaRepository<NDAStudyResource, Long> {
    List<NDAStudyResource> findBySubjectId(Long subjectId);
}