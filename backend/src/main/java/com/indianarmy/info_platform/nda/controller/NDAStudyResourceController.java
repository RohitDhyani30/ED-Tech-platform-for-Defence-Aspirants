package com.indianarmy.info_platform.nda.controller;

import com.indianarmy.info_platform.nda.dto.NDAStudyResourceResponse;
import com.indianarmy.info_platform.nda.entity.NDAStudyResource;
import com.indianarmy.info_platform.nda.repository.NDAStudyResourceRepository;
import com.indianarmy.info_platform.nda.service.NDAStudyResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nda/resources")
@RequiredArgsConstructor
public class NDAStudyResourceController {

    private final NDAStudyResourceService service;

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<NDAStudyResourceResponse> getAll() {
        return service.getAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public NDAStudyResource create(@RequestBody NDAStudyResource resource) {
        return service.create(resource);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public NDAStudyResource update(@PathVariable Long id,
                                   @RequestBody NDAStudyResource updated) {
        return service.update(id , updated);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping("/subject/{subjectId}")
    public List<NDAStudyResource> getBySubject(@PathVariable Long subjectId) {
        return service.getBySubject(subjectId);
    }
}