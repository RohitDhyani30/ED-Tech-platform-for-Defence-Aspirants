package com.indianarmy.info_platform.ssb.service;

import com.indianarmy.info_platform.ssb.dto.SSBResourceResponse;
import com.indianarmy.info_platform.ssb.entity.SSBResource;
import com.indianarmy.info_platform.ssb.repository.SSBResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SSBResourceService {

    private final SSBResourceRepository repository;

    public List<SSBResourceResponse> getAll() {

        return repository.findAll()
                .stream()
                .map(r -> new SSBResourceResponse(
                        r.getId(),
                        r.getTitle(),
                        r.getDescription(),
                        r.getUrl(),
                        r.getResourceType()
                ))
                .toList();
    }

    public SSBResource create(SSBResource resource) {
        return repository.save(resource);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Resource not found with id: " + id);
        }
        repository.deleteById(id);
    }

}