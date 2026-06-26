## When getCourseById("C004") is called, which file does the request go to first, second, and third?

1. First: CodeFlowPractice.java (The Entry Point)

The execution starts here in your demo/main class. This file initiates the action by explicitly invoking the method:
Java

```text
courseService.getCourseById("C004");
```

2. Second: CourseService.java (The Business Logic Layer)

The request hops into the service class next. This file sits in the middle and acts as the brains of your operation. It intercepts the call and forwards it to the data access layer:
Java

```text
public Optional<Course> getCourseById(String courseId) {
    return courseRepository.findById(courseId); // Forwards to the repository
}
```

3. Third: InMemoryCourseRepository.java (The Data Access Layer)

Finally, the request lands in your repository implementation. This is the file that directly interacts with the data storage (your in-memory collection or database) to grab the actual Course object and pass it all the way back up to your main class.