package com.indianarmy.info_platform.nda.service;

import com.indianarmy.info_platform.nda.entity.NDAEligibility;
import com.indianarmy.info_platform.nda.repository.NDAEligibilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NDAEligibilityService {

    private final NDAEligibilityRepository repository;

    public List<NDAEligibility> getAll() {
        return repository.findAll();
    }

    public NDAEligibility create(@RequestBody NDAEligibility eligibility) {
        return repository.save(eligibility);
    }

    public NDAEligibility update(@PathVariable Long id,
                                 @RequestBody NDAEligibility updated) {

        NDAEligibility existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        existing.setMinAge(updated.getMinAge());
        existing.setMaxAge(updated.getMaxAge());
        existing.setEducationRequirement(updated.getEducationRequirement());
        existing.setNationality(updated.getNationality());
        existing.setMaritalStatus(updated.getMaritalStatus());

        return repository.save(existing);
    }

    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
