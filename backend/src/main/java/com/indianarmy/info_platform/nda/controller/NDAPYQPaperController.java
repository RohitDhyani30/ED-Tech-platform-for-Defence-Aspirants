package com.indianarmy.info_platform.nda.controller;

import com.indianarmy.info_platform.nda.entity.NDAPYQPaper;
import com.indianarmy.info_platform.nda.service.NDAPYQPaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nda/pyq")
@RequiredArgsConstructor
public class NDAPYQPaperController {

    private final NDAPYQPaperService service;

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<NDAPYQPaper> getAll() {
        return service.getAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public NDAPYQPaper create(@RequestBody NDAPYQPaper paper) {
        return service.create(paper);
    }
}