package com.indianarmy.info_platform.ssb.service;

import com.indianarmy.info_platform.ssb.entity.SSBOverview;
import com.indianarmy.info_platform.ssb.repository.SSBOverviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SSBOverviewService {

    private final SSBOverviewRepository repository;

    public List<SSBOverview> getAll() {
        return repository.findAll();
    }

    public SSBOverview create(SSBOverview overview) {
        return repository.save(overview);
    }

}