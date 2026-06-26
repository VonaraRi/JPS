package src.main.java.com.fullstack.demo;

import src.main.java.com.fullstack.demo.exception.CourseNotFoundException;
import src.main.java.com.fullstack.demo.model.Course;
import src.main.java.com.fullstack.demo.repository.CourseRepository;
import src.main.java.com.fullstack.demo.repository.InMemoryCourseRepository;
import src.main.java.com.fullstack.demo.service.CourseService;

public class ExceptionPractice {
    public static void main(String[] args) {
        CourseRepository courseRepository = new InMemoryCourseRepository();
        CourseService courseService = new CourseService(courseRepository); //Service Layer @ Manager

        //Task B
        Course course1 = new Course("C001", "Java Fundamentals", 40, "Beginner", "Programming", true);
        Course course2 = new Course("C002", "React Frontend Development", 32, "Intermediate", "Web Development", true);

        courseService.createCourse(course1);
        courseService.createCourse(course2);
        
        //Task C: Find an existing course
        Course course = courseService.getCourseById("C001")
                                    .orElseThrow(() -> new CourseNotFoundException("Course 001 not found"));
        course.printSummary();

        //Task D: Find a missing course and catch the exception
        try {
            Course missingCourse = courseService.getCourseById("C999")
                .orElseThrow(() -> new CourseNotFoundException("Course C999 not found."));
            missingCourse.printSummary();
        } catch (CourseNotFoundException e) {
            System.out.println("Friendly message for user: " + e.getMessage());
        }

        //Task E: Add one more try/catch block
        try {
            // Added .orElseThrow to trigger the exception when C888 is missing
            Course anotherMissingCourse = courseService.getCourseById("C888")
                .orElseThrow(() -> new CourseNotFoundException("Course C888 not found."));
            anotherMissingCourse.printSummary();
        } catch (CourseNotFoundException e) {
            System.out.println("Friendly message for user: Cannot display course details because the course does not exist.");
        }

    }
    
}
