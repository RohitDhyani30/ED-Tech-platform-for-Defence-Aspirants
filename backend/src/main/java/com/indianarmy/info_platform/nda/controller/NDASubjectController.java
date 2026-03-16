package com.indianarmy.info_platform.nda.controller;

import com.indianarmy.info_platform.nda.dto.NDASubjectResponse;
import com.indianarmy.info_platform.nda.entity.NDASubject;
import com.indianarmy.info_platform.nda.service.NDASubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nda/subjects")
@RequiredArgsConstructor
public class NDASubjectController {

    private final NDASubjectService service;

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<NDASubjectResponse> getAll() {
        return service.getAllSubjects();
    }

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping("/{id}")
    public NDASubject getById(@PathVariable Long id) {
        return service.getSubjectById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public NDASubject create(@RequestBody NDASubject subject) {
        return service.createSubject(subject);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public NDASubject update(@PathVariable Long id,
                             @RequestBody NDASubject subject) {
        return service.updateSubject(id, subject);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteSubject(id);
    }
}