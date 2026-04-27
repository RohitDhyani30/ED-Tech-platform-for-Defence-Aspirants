package com.indianarmy.info_platform.ssb.controller;

import com.indianarmy.info_platform.ssb.dto.SSBStageResponse;
import com.indianarmy.info_platform.ssb.entity.SSBStage;
import com.indianarmy.info_platform.ssb.service.SSBStageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ssb/stages")
@RequiredArgsConstructor
public class SSBStageController {

    private final SSBStageService service;

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<SSBStageResponse> getAll() {
        return service.getAllStages();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public SSBStage create(@RequestBody SSBStage stage) {
        return service.createStage(stage);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public SSBStage update(@PathVariable Long id, @RequestBody SSBStage stage) {
        return service.updateStage(id, stage);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteStage(@PathVariable Long id) {
        service.deleteStage(id);
        return "Stage deleted successfully";
    }
}