package src.main.java.com.fullstack.demo;

public class Main {
    public static void main (String[] args){
        //Syntax for creating a new object (instance) of the Course class
        //ClassName objectName = new Construtor();
        //ClassName and Constructor usually match
        
        // Create Instructors
        Instructor instructor1 = new Instructor("I001", "Dr. Alice Smith", "Computer Science");
        Instructor instructor2 = new Instructor("I002", "Aina Rahman", "Data Science");
        Instructor instructor3 = new Instructor("I003", "Dr. Carol Williams", "Web Development");

        // Create Courses
        Course course1 = new Course("C5101", "Introduction to Computer Science", 40, "Beginner", "Programming", true);
        Course course2 = new Course("C5102", "Java Fundamentals", 50, "Intermediate", "Database", true);
        Course course3 = new Course("C5103", "Advanced Web Development", 60, "Advanced", "Frontend", false);

        // Create Course Offerings
        CourseOffering courseOffering1 = new CourseOffering(
            "OFF001",
            "Java Fundamental - June 2026 Intake",
            course2,
            instructor2,
            "2026-06-20",
            "2026-06-29",
            25,
            "Online"
        );

        CourseOffering courseOffering2 = new CourseOffering(
            "OFF002",
            "Introduction to Computer Science - July 2026 Intake",
            course1,
            instructor1,
            "2026-07-01",
            "2026-07-15",
            30,
            "Physical"
        );

        CourseOffering courseOffering3 = new CourseOffering(
            "OFF003",
            "Advanced Web Development - August 2026 Intake",
            course3,
            instructor3,
            "2026-08-01",
            "2026-08-30",
            20,
            "Hybrid"
        );

        // Assign Instructors to Courses
        course1.setInstructor(instructor1);
        course2.setInstructor(instructor2);
        course3.setInstructor(instructor3);

        // Display Course Summaries
        System.out.println("===== Course Information =====");
        System.out.println();
        course1.printSummary();
        System.out.println();
        course2.printSummary();
        System.out.println();
        course3.printSummary();

        // Display Course Offering Summaries
        System.out.println();
        System.out.println("===== Course Offering Information =====");
        System.out.println();
        courseOffering1.printOfferingSummary();
        System.out.println();
        courseOffering2.printOfferingSummary();
        System.out.println();
        courseOffering3.printOfferingSummary();

        // Display Instructor Profiles
        System.out.println();
        System.out.println("===== Instructor Profiles =====");
        System.out.println();
        instructor1.printProfile();
        System.out.println();
        instructor2.printProfile();
        System.out.println();
        instructor3.printProfile();
        System.out.println();

        // Create Students
        Student student1 = new Student("S001", "John Davis", "john.davis@email.com");
        Student student2 = new Student("S002", "Sarah Wilson", "sarah.wilson@email.com");
        Student student3 = new Student("S003", "Michael Brown", "michael.brown@email.com");

        // Display Student Profiles
        System.out.println();
        System.out.println("===== Student Profiles =====");
        System.out.println();
        student1.printProfile();
        System.out.println();
        student2.printProfile();
        System.out.println();
        student3.printProfile();
    }
}
