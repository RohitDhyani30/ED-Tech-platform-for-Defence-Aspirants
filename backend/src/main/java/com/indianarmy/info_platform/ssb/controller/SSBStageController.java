package com.indianarmy.info_platform.ssb.controller;

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
    public List<SSBStage> getAll() {
        return service.getAllStages();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public SSBStage create(@RequestBody SSBStage stage) {
        return service.createStage(stage);
    }
}