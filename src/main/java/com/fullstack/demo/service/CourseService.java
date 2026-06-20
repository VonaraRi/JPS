package src.main.java.com.fullstack.demo.service;

import src.main.java.com.fullstack.demo.repository.CourseRepository;
import src.main.java.com.fullstack.demo.model.Course;

public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository){
        this.courseRepository = courseRepository;
    }

    public Course createCourse(Course course) {
        validateCourse(course);
        if (courseRepository)
    }

    public Course getCourseById(String courseId) {
        return courseRepository.
    }

    private List<Course>

    private void validateCourse(Course course) {

    }
}
