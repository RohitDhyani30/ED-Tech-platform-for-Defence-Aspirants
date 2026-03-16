package com.indianarmy.info_platform.nda.repository;

import com.indianarmy.info_platform.nda.entity.NDAPYQPaper;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NDAPYQPaperRepository extends JpaRepository<NDAPYQPaper, Long> {
    List<NDAPYQPaper> findByYear(Integer year);

    List<NDAPYQPaper> findBySubjectId(Long subjectId);
}
