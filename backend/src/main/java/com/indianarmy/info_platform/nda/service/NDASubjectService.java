package com.indianarmy.info_platform.nda.service;

import com.indianarmy.info_platform.nda.entity.NDASubject;
import com.indianarmy.info_platform.nda.repository.NDASubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NDASubjectService {

    private final NDASubjectRepository repository;

    public List<NDASubject> getAllSubjects() {
        return repository.findAll();
    }

    public NDASubject getSubjectById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found with id: " + id));
    }

    public NDASubject createSubject(NDASubject subject) {

        if (subject.getName() == null || subject.getName().isBlank()) {
            throw new RuntimeException("Subject name cannot be empty");
        }

        return repository.save(subject);
    }

    public NDASubject updateSubject(Long id, NDASubject updated) {

        NDASubject existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found with id: " + id));

        existing.setName(updated.getName());
        existing.setTotalMarks(updated.getTotalMarks());
        existing.setDurationMinutes(updated.getDurationMinutes());
        existing.setSyllabusText(updated.getSyllabusText());

        return repository.save(existing);
    }

    public void deleteSubject(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Subject not found with id: " + id);
        }

        repository.deleteById(id);
    }
}