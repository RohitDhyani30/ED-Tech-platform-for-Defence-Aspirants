package com.indianarmy.info_platform.nda.service;

import com.indianarmy.info_platform.nda.entity.NDAPYQPaper;
import com.indianarmy.info_platform.nda.repository.NDAPYQPaperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NDAPYQPaperService {

    private final NDAPYQPaperRepository repository;

    public List<NDAPYQPaper> getAll(){
        return repository.findAll();
    }

    public NDAPYQPaper create(@RequestBody NDAPYQPaper paper){
        return repository.save(paper);
    }

}
