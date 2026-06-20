package src.main.java.com.fullstack.demo.service;

import src.main.java.com.fullstack.demo.repository.CourseRepository;
import src.main.java.com.fullstack.demo.model.Course;
import src.main.java.com.fullstack.demo.model.Instructor;
import src.main.java.com.fullstack.demo.exception.InvalidCourseException;
import java.util.List;
import java.util.Optional;

public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository){
        this.courseRepository = courseRepository;
    }

    public Course createCourse(Course course){
        validateCourse(course);
        return courseRepository.save(course);
    }

    public Optional<Course> getCourseById(String courseId) {
        return courseRepository.findById(courseId);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    public List<Course> searchByTitle(String keyword) {
        String safeKeyword = (keyword == null) ? "" : keyword.trim().toLowerCase();

        return courseRepository.findAll().stream()
            .filter(course -> course.getTitle() != null && course.getTitle().toLowerCase().contains(safeKeyword))
            .toList();
    }

    public List<Course> filterByLevel(String level) {
        String safeLevel = (level == null) ? "" : level.trim().toLowerCase();

        return courseRepository.findAll().stream()
            .filter(course -> course.getLevel() != null && course.getLevel().toLowerCase().contains(safeLevel))
            .toList();
    }

    public Course assignInstructor(String courseId, Instructor instructor) {
        return getCourseById(courseId)
            .map(course -> {
                course.setInstructor(instructor);
                return courseRepository.save(course);
            })
            .orElseThrow(() -> new InvalidCourseException("Course with ID" + courseId + "not found"));
    }

    public List<Course> searchByInstructorName(String instructorName) {
        String safeName = (instructorName == null) ? "" : instructorName.trim().toLowerCase();

        return courseRepository.findAll().stream()
            .filter(course -> course.getInstructor() != null) //ignore courses with no instructor
            .filter(course -> course.getInstructor().getInstructorName() != null &&
                                course.getInstructor().getInstructorName().toLowerCase().contains(safeName))
            .toList();
    }

    private void validateCourse(Course course){
        if (course == null) {
            throw new InvalidCourseException("Course cannot be null.");
        }

        if(isBlank(course.getCourseId())){
            throw new InvalidCourseException("Course ID is required");
        }

        if (isBlank(course.getTitle())) {
            throw new InvalidCourseException("Course title is required.");
        }
        
        if (course.getDurationHours() <= 0) {
            throw new InvalidCourseException("Course duration must be greater than zero.");
        }
        
        if (isBlank(course.getLevel())) {
            throw new InvalidCourseException("Course level is required.");
        }
    }

}
