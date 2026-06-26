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



## Why is throwing CourseNotFoundException better than printing inside CourseService? 

Throwing a CourseNotFoundException is better because the service layer shouldn't decide how to display errors.

By throwing an exception instead of printing, you allow different frontends to handle the same error in their own way:

-    Console App: Catches it and prints a clean message to the terminal.

-    Web API: Catches it and converts it into a 404 Not Found HTTP network status code.

-    Frontend App (React/Mobile): Sees that 404 status and turns it into a beautiful popup or toast alert for the user.

## Why is CourseOffering a better design than putting start date, end date, and capacity directly inside Course?

Putting schedules inside Course breaks your system because a course is a template, while an offering is a real event.

Separating them avoids critical design flaws:

-    One Course, Many Intakes: You can offer "Java Fundamentals" in June, July, and September without creating three identical course objects.

-   No Data Duplication: If the course name changes, you update it once in the Course class, and all offerings instantly reflect the update.

-    Logistics Tracking: It separates what you are learning (curriculum) from how/when you are learning it (dates, room number, and enrollment capacity).

The Blueprint Analogy: Course is the blueprint for a house. CourseOffering is the actual house built on a specific plot of land at a specific time.