package com.indianarmy.info_platform.nda.controller;

import com.indianarmy.info_platform.nda.dto.NDAExamInfoResponse;
import com.indianarmy.info_platform.nda.entity.NDAExamInfo;
import com.indianarmy.info_platform.nda.repository.NDAExamInfoRepository;
import com.indianarmy.info_platform.nda.service.NDAExamInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nda/info")
@RequiredArgsConstructor
public class NDAExamInfoController {

    private final NDAExamInfoService service;

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<NDAExamInfoResponse> getAll() {
        return service.getAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public NDAExamInfo create(@RequestBody NDAExamInfo info) {
        return service.create(info);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public NDAExamInfo update(@PathVariable Long id,
                              @RequestBody NDAExamInfo updated) {

        return service.update(id , updated);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}