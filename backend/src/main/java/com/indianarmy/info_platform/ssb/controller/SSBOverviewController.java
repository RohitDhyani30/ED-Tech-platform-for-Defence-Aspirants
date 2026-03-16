package com.indianarmy.info_platform.ssb.controller;

import com.indianarmy.info_platform.ssb.dto.SSBOverviewResponse;
import com.indianarmy.info_platform.ssb.entity.SSBOverview;
import com.indianarmy.info_platform.ssb.service.SSBOverviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ssb/overview")
@RequiredArgsConstructor
public class SSBOverviewController {

    private final SSBOverviewService service;

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<SSBOverviewResponse> getAll() {
        return service.getAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public SSBOverview create(@RequestBody SSBOverview overview) {
        return service.create(overview);
    }
}