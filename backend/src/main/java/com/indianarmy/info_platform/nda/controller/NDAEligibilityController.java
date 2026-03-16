package com.indianarmy.info_platform.nda.controller;

import com.indianarmy.info_platform.nda.dto.NDAEligibilityResponse;
import com.indianarmy.info_platform.nda.entity.NDAEligibility;
import com.indianarmy.info_platform.nda.repository.NDAEligibilityRepository;
import com.indianarmy.info_platform.nda.service.NDAEligibilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nda/eligibility")
@RequiredArgsConstructor
public class NDAEligibilityController {

    private final NDAEligibilityService service;

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<NDAEligibilityResponse> getAll() {
        return service.getAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public NDAEligibility create(@RequestBody NDAEligibility eligibility) {
        return service.create(eligibility);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public NDAEligibility update(@PathVariable Long id,
                                 @RequestBody NDAEligibility updated) {


        return service.update(id , updated);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}