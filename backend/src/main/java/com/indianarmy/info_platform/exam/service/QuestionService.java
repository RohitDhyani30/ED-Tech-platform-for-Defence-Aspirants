package com.indianarmy.info_platform.exam.service;

import com.indianarmy.info_platform.exam.entity.Question;
import com.indianarmy.info_platform.exam.repository.QuestionRepository;
import com.indianarmy.info_platform.nda.entity.NDASubject;
import com.indianarmy.info_platform.nda.repository.NDASubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final NDASubjectRepository subjectRepository;

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
    }

    public Question createQuestion(Question question) {
        if (question.getSubject() != null && question.getSubject().getId() != null) {
            NDASubject subject = subjectRepository.findById(question.getSubject().getId())
                    .orElseThrow(() -> new RuntimeException("Subject not found"));
            question.setSubject(subject);
        }
        return questionRepository.save(question);
    }

    public Question updateQuestion(Long id, Question updated) {
        Question existing = getQuestionById(id);
        existing.setText(updated.getText());
        existing.setOptionA(updated.getOptionA());
        existing.setOptionB(updated.getOptionB());
        existing.setOptionC(updated.getOptionC());
        existing.setOptionD(updated.getOptionD());
        existing.setCorrectAnswer(updated.getCorrectAnswer());
        existing.setDifficulty(updated.getDifficulty());
        existing.setMarks(updated.getMarks());
        if (updated.getSubject() != null && updated.getSubject().getId() != null) {
            existing.setSubject(updated.getSubject());
        }
        return questionRepository.save(existing);
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    public List<Question> getQuestionsBySubject(Long subjectId) {
        return questionRepository.findBySubjectId(subjectId);
    }
}