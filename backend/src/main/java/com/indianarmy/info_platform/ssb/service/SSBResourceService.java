package com.indianarmy.info_platform.ssb.service;

import com.indianarmy.info_platform.ssb.entity.SSBResource;
import com.indianarmy.info_platform.ssb.repository.SSBResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SSBResourceService {

    private final SSBResourceRepository repository;

    public List<SSBResource> getAll() {
        return repository.findAll();
    }

    public SSBResource create(SSBResource resource) {
        return repository.save(resource);
    }

}