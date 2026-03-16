package com.indianarmy.info_platform.ssb.service;

import com.indianarmy.info_platform.ssb.entity.SSBTest;
import com.indianarmy.info_platform.ssb.repository.SSBTestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SSBTestService {

    private final SSBTestRepository repository;

    public List<SSBTest> getAll() {
        return repository.findAll();
    }

    public List<SSBTest> getTestsByStage(Long stageId) {
        return repository.findByStageId(stageId);
    }

    public SSBTest create(SSBTest test) {
        return repository.save(test);
    }

}