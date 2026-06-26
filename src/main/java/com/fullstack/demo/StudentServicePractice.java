package src.main.java.com.fullstack.demo;

import java.util.List;

import src.main.java.com.fullstack.demo.exception.DuplicateStudentException;
import src.main.java.com.fullstack.demo.exception.StudentNotFoundException;
import src.main.java.com.fullstack.demo.model.Student;
import src.main.java.com.fullstack.demo.repository.InMemoryStudentRepository;
import src.main.java.com.fullstack.demo.repository.StudentRepository;
import src.main.java.com.fullstack.demo.service.StudentService;

public class StudentServicePractice {
    public static void main(String[] args) {
        StudentRepository studentRepository = new InMemoryStudentRepository();
        StudentService studentService = new StudentService(studentRepository);

        System.out.println("=== Register Students ===");
        Student student1 = new Student("S001", "Roberto Chan", "roberto@example.com");
        Student student2 = new Student("S002", "Priya Nair", "priya@example.com");
        Student student3 = new Student("S003", "Lee Salazae", "lee@example.com");

        studentService.registerStudent(student1);
        studentService.registerStudent(student2);
        studentService.registerStudent(student3);

        // Try registering a duplicate to verify extension task
        try {
            studentService.registerStudent(new Student("S001", "Duplicate Roberto", "rob2@example.com"));
        } catch (DuplicateStudentException e) {
            System.out.println("[Handled Expected Exception] " + e.getMessage() + "\n");
        }

        System.out.println("=== All Students ===");
        List<Student> allStudents = studentService.getAllStudents();
        for (Student s : allStudents) {
            System.out.println(s.getStudentId() + " - " + s.getStudentName() + " (" + s.getEmail() + ")");
        }
        System.out.println();

        System.out.println("=== Find Student By ID ===");
        Student foundStudent = studentService.getStudentById("S002");
        System.out.println("Found: " + foundStudent.getStudentName() + "\n");

        System.out.println("=== Search Student By Name ===");
        System.out.println("Searching for keyword 'chan' using Loop:");
        List<Student> loopResults = studentService.searchByNameUsingLoop("chan");
        for (Student s : loopResults) {
            System.out.println("-> " + s.getStudentName());
        }

        System.out.println("\nSearching for keyword 'Lee' using Extension Stream:");
        List<Student> streamResults = studentService.searchByNameUsingStream("Lee");
        for (Student s : streamResults) {
            System.out.println("-> " + s.getStudentName());
        }
        System.out.println();

        System.out.println("=== Missing Student Test ===");
        try {
            studentService.getStudentById("S999");
        } catch (StudentNotFoundException e) {
            // Catching custom exception and displaying a friendly message
            System.out.println("Friendly Notice: " + e.getMessage());
        }
    }
}
