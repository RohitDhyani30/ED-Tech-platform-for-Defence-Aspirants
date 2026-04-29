package com.indianarmy.info_platform.ssb.controller;

import com.indianarmy.info_platform.ssb.dto.SSBResourceResponse;
import com.indianarmy.info_platform.ssb.entity.SSBResource;
import com.indianarmy.info_platform.ssb.service.SSBResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public List<SSBResourceResponse> getAll() {
        return service.getAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public SSBResource create(@RequestBody SSBResource resource) {
        return service.create(resource);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResource(@PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.ok().body("Resource deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}