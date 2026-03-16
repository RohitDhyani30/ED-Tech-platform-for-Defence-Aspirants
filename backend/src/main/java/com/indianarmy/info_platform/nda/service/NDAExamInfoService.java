package com.indianarmy.info_platform.nda.service;

import com.indianarmy.info_platform.nda.dto.NDAExamInfoResponse;
import com.indianarmy.info_platform.nda.entity.NDAExamInfo;
import com.indianarmy.info_platform.nda.repository.NDAExamInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NDAExamInfoService {

    private final NDAExamInfoRepository repository;

    public List<NDAExamInfoResponse> getAll() {

        return repository.findAll()
                .stream()
                .map(info -> new NDAExamInfoResponse(
                        info.getId(),
                        info.getIntroduction(),
                        info.getConductingBody(),
                        info.getOfficialWebsite(),
                        info.getExamFrequency()
                ))
                .toList();
    }

    public NDAExamInfo create(@RequestBody NDAExamInfo info) {
        return repository.save(info);
    }

    public NDAExamInfo update(@PathVariable Long id,
                              @RequestBody NDAExamInfo updated) {

        NDAExamInfo existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        existing.setIntroduction(updated.getIntroduction());
        existing.setConductingBody(updated.getConductingBody());
        existing.setOfficialWebsite(updated.getOfficialWebsite());
        existing.setExamFrequency(updated.getExamFrequency());

        return repository.save(existing);
    }

    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
