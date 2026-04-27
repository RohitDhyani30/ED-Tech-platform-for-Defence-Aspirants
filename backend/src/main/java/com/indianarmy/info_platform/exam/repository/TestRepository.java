package com.indianarmy.info_platform.exam.repository;

import com.indianarmy.info_platform.exam.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestRepository extends JpaRepository<Test, Long> {
    List<Test> findBySubjectId(Long subjectId);
}