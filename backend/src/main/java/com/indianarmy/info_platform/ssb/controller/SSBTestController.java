package com.indianarmy.info_platform.ssb.controller;

import com.indianarmy.info_platform.ssb.dto.SSBTestResponse;
import com.indianarmy.info_platform.ssb.entity.SSBTest;
import com.indianarmy.info_platform.ssb.service.SSBTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ssb/tests")
@RequiredArgsConstructor
public class SSBTestController {

    private final SSBTestService service;

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<SSBTestResponse> getAll() {
        return service.getAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping("/stage/{stageId}")
    public List<SSBTest> getByStage(@PathVariable Long stageId) {
        return service.getTestsByStage(stageId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public SSBTest create(@RequestBody SSBTest test) {
        return service.create(test);
    }
}