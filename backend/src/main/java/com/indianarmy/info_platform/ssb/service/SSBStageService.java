package com.indianarmy.info_platform.ssb.service;

import com.indianarmy.info_platform.ssb.dto.SSBStageResponse;
import com.indianarmy.info_platform.ssb.entity.SSBStage;
import com.indianarmy.info_platform.ssb.repository.SSBStageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SSBStageService {

    private final SSBStageRepository repository;

    public List<SSBStageResponse> getAllStages() {

        return repository.findAll()
                .stream()
                .map(stage -> new SSBStageResponse(
                        stage.getId(),
                        stage.getStageName(),
                        stage.getDayNumber(),
                        stage.getDescription()
                ))
                .toList();
    }

    public SSBStage createStage(SSBStage stage) {
        return repository.save(stage);
    }

}