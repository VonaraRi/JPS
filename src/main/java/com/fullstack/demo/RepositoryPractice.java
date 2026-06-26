package src.main.java.com.fullstack.demo;

import src.main.java.com.fullstack.demo.model.Course;
import src.main.java.com.fullstack.demo.repository.CourseRepository;
import src.main.java.com.fullstack.demo.repository.InMemoryCourseRepository;

import java.util.List;
import java.util.Optional;

public class RepositoryPractice {
    public static void main(String[] args) {
        /// The variable type is CourseRepository, but the actual object is InMemoryCourseRepository.
        CourseRepository courseRepository = new InMemoryCourseRepository();

        Course apiCourse1 = new Course("C005", "API Documentation", 7, "Beginner", "Java Fundamental", false);
        Course apiCourse2 = new Course("C006", "Java Collections Practice", 12, "Beginner", "Java Fundamental", false);
        Course apiCourse3 = new Course("C007", "Clean Code Basics", 8, "Intermediate", "Software Engineering", false);
        
        courseRepository.save(apiCourse1);
        courseRepository.save(apiCourse2);
        courseRepository.save(apiCourse3);

        System.out.println("==== All Courses ===");
        List<Course> courses = courseRepository.findAll();
        for (Course course : courses){
            course.printSummary();
        }
        System.out.println();

        System.out.println("=== Find C006 ===");
        Optional<Course> optionalCourse = courseRepository.findById("C006");

        if (optionalCourse.isPresent()) {
            Course foundCourse = optionalCourse.get();
            foundCourse.printSummary();
        } else {
            System.out.println("Course not found.");
        }
        System.out.println();

        System.out.println("=== Exists Check ===");
        boolean isCoursePresent = courseRepository.existsById("C007");
        System.out.println("C007 exists: " + isCoursePresent);
    }
}