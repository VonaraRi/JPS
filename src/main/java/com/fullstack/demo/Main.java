package src.main.java.com.fullstack.demo;

import src.main.java.com.fullstack.demo.model.Course;
import src.main.java.com.fullstack.demo.model.CourseOffering;
import src.main.java.com.fullstack.demo.model.Instructor;
import src.main.java.com.fullstack.demo.model.Student;
import java.util.ArrayList;

public class Main {
    public static void main (String[] args){
        //Syntax for creating a new object (instance) of the Course class
        //ClassName objectName = new Construtor();
        //ClassName and Constructor usually match

        // Instructors already assigned in Course constructors

        // Store objects in ArrayLists 
        ArrayList<Course> courses = new ArrayList<>();
        ArrayList<Instructor> instructors = new ArrayList<> ();
        ArrayList<Student> students = new ArrayList<>();
        ArrayList<CourseOffering> offerings = new ArrayList<>();

        // 1. Create courses
        courses.add(new Course("C001", "Java Fundamentals", 14, "Beginner", "Programming", true));
        courses.add(new Course("C5102", "Java Fundamentals", 50, "Intermediate", "Database", true));
        courses.add(new Course("C5103", "Advanced Web Development", 60, "Advanced", "Frontend", false));

        // 2. create instructor
        instructors.add(new Instructor("I001", "Dr. Alice Smith", "Computer Science"));
        instructors.add(new Instructor("I002", "Aina Rahman", "Data Science"));

        // 3. create students
        students.add(new Student("S001", "John Davis", "john.davis@email.com"));
        students.add(new Student("S002", "Sarah Wilson", "sarah.wilson@email.com"));
        students.add(new Student("S003", "Michael Brown", "michael.brown@email.com"));

        // 4. Create Course Offerings
        offerings.add(new CourseOffering(
            "OFF001",
            "Java Fundamental - June 2026 Intake",
            courses.get(1),      
            instructors.get(1),  
            "2026-06-20",
            "2026-06-29",
            25,
            "Online"
        ));

        offerings.add(new CourseOffering(
            "OFF002",
            "Introduction to Computer Science - July 2026 Intake",
            courses.get(0),      
            instructors.get(0),  
            "2026-07-01",
            "2026-07-15",
            30,
            "Physical"
        ));

        offerings.add(new CourseOffering(
            "OFF003",
            "Advanced Web Development - August 2026 Intake",
            courses.get(2),      
            instructors.get(0),  
            "2026-08-01",
            "2026-08-30",
            20,
            "Hybrid"
        ));

        System.out.println("==== Courses Summaries ====");
        for (Course course : courses) {
            course.printSummary();
            System.out.println();

        }

        System.out.println("===== Instructor Profiles =====");
        for (Instructor instructor : instructors) {
            instructor.printSummary();
            System.out.println();
        }

        System.out.println("===== Student Profiles =====");
        for (Student student : students) {
            student.printProfile();
            System.out.println();
        }

        System.out.println("===== Course Offering Summaries =====");
        for (CourseOffering offering : offerings) {
            offering.printSummary();
            System.out.println();
        }

    }
}
