package com.indianarmy.info_platform.repository;

import com.indianarmy.info_platform.entity.MilitaryOperation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MilitaryOperationRepository
        extends JpaRepository<MilitaryOperation, Long> {
    List<MilitaryOperation> findByFeaturedTrue();
}
