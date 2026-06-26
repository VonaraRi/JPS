package src.main.java.com.fullstack.demo.service;

import src.main.java.com.fullstack.demo.repository.CourseRepository;
import src.main.java.com.fullstack.demo.model.Course;
import src.main.java.com.fullstack.demo.model.Instructor;
import src.main.java.com.fullstack.demo.exception.CourseNotFoundException;
import src.main.java.com.fullstack.demo.exception.InvalidCourseException;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

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

    //Task B
    public List<Course> searchByLevelUsingLoop(String level){
        String safeLevel = level == null ? "" : level.trim();

        List<Course> results = new ArrayList<>();
        
        for (Course course : courseRepository.findAll()){
            // check if course level matches safeLevel
            if (course.getLevel() != null && course.getLevel().equalsIgnoreCase(safeLevel)) {
                results.add(course);
            }
        }
        return results;
    
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
            .orElseThrow(() -> new InvalidCourseException("Course with ID " + courseId + " not found"));
    }

    public List<Course> searchByInstructorName(String instructorName) {
        String safeName = (instructorName == null) ? "" : instructorName.trim().toLowerCase();

        return courseRepository.findAll().stream()
            .filter(course -> course.getInstructor() != null) //ignore courses with no instructor
            .filter(course -> course.getInstructor().getInstructorName() != null &&
                                course.getInstructor().getInstructorName().toLowerCase().contains(safeName))
            .toList();
    }

    public Course updateDuration(String courseId, int newDurationHours) {
        //check if greater than zero
        if (newDurationHours <= 0) {
            throw new InvalidCourseException("Course duration must be greater than zero");
        }

        return getCourseById(courseId)
            .map(course -> {
                course.setDurationHours(newDurationHours);
                return courseRepository.save(course);
            })
            .orElseThrow(() -> new CourseNotFoundException("Course with ID " + courseId + " not found."));
    }

    public void deleteCourse(String courseId) {
        //check whether the course exists using the repository
            if (!courseRepository.existsById(courseId)){
                throw new CourseNotFoundException("Course with ID " + courseId + " cannot be deleted because it does not exist.");
        }

        courseRepository.deleteById(courseId);
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
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
