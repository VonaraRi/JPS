package src.main.java.com.fullstack.demo;

import src.main.java.com.fullstack.demo.model.Course;
import src.main.java.com.fullstack.demo.repository.CourseRepository;
import src.main.java.com.fullstack.demo.repository.InMemoryCourseRepository;
import src.main.java.com.fullstack.demo.service.CourseService;

import java.util.List;

public class SearchPractice {
    public static void main(String[] args) {
        CourseRepository courseRepository = new InMemoryCourseRepository();
        CourseService courseService = new CourseService(courseRepository);

        // Task C
        Course course1 = new Course("C001", "Java Fundamentals", 14, "Beginner", "Programming", true);
        Course course2 = new Course("C002", "React Frontend Development", 21, "Intermediate", "Web Development", true);
        Course course3 = new Course("C003", "MongoDB Basics", 10, "Beginner", "Databases", true);
        Course course4 = new Course("C004", "Spring Boot API Development", 18, "Intermediate", "Programming", true);

        courseService.createCourse(course1);
        courseService.createCourse(course2);
        courseService.createCourse(course3);
        courseService.createCourse(course4);

        
        System.out.println("=== Beginner Courses ===");
        List<Course> beginnerCourses = courseService.searchByLevelUsingLoop("Beginner");

        // 4. Print the matching courses using a loop
        for (Course course : beginnerCourses) {
            course.printSummary();
            System.out.println();
        }
        
    }
}