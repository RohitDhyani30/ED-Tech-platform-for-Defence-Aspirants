package com.indianarmy.info_platform.ssb.controller;

import com.indianarmy.info_platform.ssb.entity.SSBResource;
import com.indianarmy.info_platform.ssb.service.SSBResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ssb/resources")
@RequiredArgsConstructor
public class SSBResourceController {

    private final SSBResourceService service;

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<SSBResource> getAll() {
        return service.getAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public SSBResource create(@RequestBody SSBResource resource) {
        return service.create(resource);
    }
}