package com.indianarmy.info_platform.service;

import com.indianarmy.info_platform.entity.MilitaryOperation;
import com.indianarmy.info_platform.repository.MilitaryOperationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MilitaryOperationService {

    private final MilitaryOperationRepository repository;

    public MilitaryOperationService(MilitaryOperationRepository repository) {
        this.repository = repository;
    }

    // List page
    public List<MilitaryOperation> getAllOperations() {
        return repository.findAll();
    }

    // Detail page
    public MilitaryOperation getOperationById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Operation not found with id: " + id));
    }
    public List<MilitaryOperation> getFeaturedOperations() {
        return repository.findByFeaturedTrue();
    }

    // Data insertion
    public MilitaryOperation save(MilitaryOperation operation) {
        return repository.save(operation);
    }
}
