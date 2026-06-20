package src.main.java.com.fullstack.demo.repository;

import java.util.List;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;

import src.main.java.com.fullstack.demo.model.Course;

public class InMemoryCourseRepository implements CourseRepository {
    private Map<String, Course> courseStore = new HashMap<>();

    @Override
    public Course save(Course course) {
        courseStore.put(course.getCourseId(), course);
        return course;
    }

    @Override
    public Optional<Course> findById(String courseId) {
        return Optional.ofNullable(courseStore.get(courseId));
    }

    @Override
    public List<Course> findAll() {
        return new ArrayList<>(courseStore.values());
    }

    @Override
    public void deleteById(String courseId) {
        courseStore.remove(courseId);
    }

    @Override
    public boolean existsById(String courseId) {
        return courseStore.containsKey(courseId);
    }
}
