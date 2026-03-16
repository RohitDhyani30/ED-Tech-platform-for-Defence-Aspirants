package com.indianarmy.info_platform.ssb.repository;

import com.indianarmy.info_platform.ssb.entity.SSBResource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SSBResourceRepository extends JpaRepository<SSBResource, Long> {
    List<SSBResource> findByResourceType(String resourceType);
}