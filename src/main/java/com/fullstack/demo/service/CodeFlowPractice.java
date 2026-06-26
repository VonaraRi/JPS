package src.main.java.com.fullstack.demo.service;

import src.main.java.com.fullstack.demo.repository.InMemoryCourseRepository;
import src.main.java.com.fullstack.demo.model.Course;
import src.main.java.com.fullstack.demo.repository.CourseRepository;
import src.main.java.com.fullstack.demo.service.CourseService;

public class CodeFlowPractice {
    public static void main(String[] args) {
        // Create dependency (the "battery")
        CourseRepository courseRepository = new InMemoryCourseRepository();
        
        // Pass it into the service (the "phone")
        CourseService courseService = new CourseService(courseRepository);

        Course newCourse = new Course("C004", "Spring Boot API Developement", 18, "Intermediate", "Programming", true);

        courseService.createCourse(newCourse);
        /* * FLOW FOR CREATING A COURSE:
         * 1. This Demo class calls 'courseService.createCourse(newCourse)'.
         * 2. Inside CourseService, it runs 'validateCourse(course)' to check rules (ID, Title, Duration).
         * 3. Once valid, CourseService asks 'courseRepository.save(course)' to save it.
         * 4. InMemoryCourseRepository intercepts this call and stores the course in its internal HashMap/List memory.
         */

        Course foundCourse = courseService.getCourseById("C004").orElse(null);
        /* * FLOW FOR RETRIEVING A COURSE:
         * 1. This Demo class calls 'courseService.getCourseById("C004")'.
         * 3. CourseService forwards the request and asks 'courseRepository.findById("C004")'.
         * 4. InMemoryCourseRepository looks up and finds the course data inside its memory.
         * 5. The found Course object is passed back up through the service layer and returned right here to our demo class.
         */

        if (foundCourse != null){
            foundCourse.printSummary();
        }
    }
}
