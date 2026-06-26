package src.main.java.com.fullstack.demo.service;

import java.util.ArrayList;
import java.util.List;

import src.main.java.com.fullstack.demo.exception.DuplicateStudentException;
import src.main.java.com.fullstack.demo.exception.StudentNotFoundException;
import src.main.java.com.fullstack.demo.model.Student;
import src.main.java.com.fullstack.demo.repository.StudentRepository;

public class StudentService{
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student registerStudent(Student student){
        //1. Student cannot be null.
        if (student == null){
            throw new IllegalArgumentException("Student data cannot be null");
        }

        //2. Student ID cannot already exist.
        if (studentRepository.existsById(student.getStudentId())) {
            throw new DuplicateStudentException("Student already exists: " + student.getStudentId());
        }

        //3. Save student using repository.
        //4. Return saved student.
        return studentRepository.save(student);
    }

    // 2. getStudentById - Added missing return statement
    public Student getStudentById(String studentId){
        return studentRepository.findById(studentId)
            .orElseThrow(() -> new StudentNotFoundException(studentId));
    }

    // 3. getAllStudents - Implemented to fetch all records
    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    // 4. searchByNameUsingLoop
    public List<Student> searchByNameUsingLoop(String keyword) {
        // 1 & 2: If keyword is null, use empty string. Convert keyword to lowercase.
        String safeKeyword = (keyword == null) ? "" : keyword.trim().toLowerCase();

        // 3: Create ArrayList<Student>.
        List<Student> results = new ArrayList<>();

        // 4: Loop through all students.
        for (Student student : studentRepository.findAll()) {
            // 5: If student name contains keyword, add to results.
            if (student.getStudentName() != null &&
                student.getStudentName().toLowerCase().contains(safeKeyword)) {
                results.add(student);
            }
        }

        // 6: Return results.
        return results;
    }

    // Extension Task Stream Version
    public List<Student> searchByNameUsingStream(String keyword) {
        String safeKeyword = (keyword == null) ? "" : keyword.trim().toLowerCase();

        return studentRepository.findAll().stream()
            .filter(student -> student.getStudentName() != null &&
                               student.getStudentName().toLowerCase().contains(safeKeyword))
            .toList();
    }
    
}
