package com.indianarmy.info_platform.ssb.service;

import com.indianarmy.info_platform.ssb.dto.SSBOverviewResponse;
import com.indianarmy.info_platform.ssb.entity.SSBOverview;
import com.indianarmy.info_platform.ssb.repository.SSBOverviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SSBOverviewService {

    private final SSBOverviewRepository repository;

    public List<SSBOverviewResponse> getAll() {

        return repository.findAll()
                .stream()
                .map(o -> new SSBOverviewResponse(
                        o.getId(),
                        o.getIntroduction(),
                        o.getPurpose(),
                        o.getSelectionProcessSummary(),
                        o.getOfficialWebsite()
                ))
                .toList();
    }

    public SSBOverview create(SSBOverview overview) {
        return repository.save(overview);
    }

}