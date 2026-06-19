package src.main.java.com.fullstack;

public class Main {
    public static void main (String[] args){
        //Syntax for creating a new object (instance) of the Course class
        //ClassName objectName = new Construtor();
        //ClassName and Constructor usually match
        
        // Create Instructors
        Instructor instructor1 = new Instructor("I001", "Dr. Alice Smith", "Computer Science");
        Instructor instructor2 = new Instructor("I002", "Prof. Bob Johnson", "Data Science");
        Instructor instructor3 = new Instructor("I003", "Dr. Carol Williams", "Web Development");

        // Create Courses
        Course course1 = new Course("C5101", "Introduction to Computer Science", 40, "Beginner");
        Course course2 = new Course("C5102", "Data Science Fundamentals", 50, "Intermediate");
        Course course3 = new Course("C5103", "Advanced Web Development", 60, "Advanced");

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

        // Display Instructor Profiles
        System.out.println("===== Instructor Profiles =====");
        instructor1.printProfile();
        instructor2.printProfile();
        instructor3.printProfile();

        // Create Students
        Student student1 = new Student("S001", "John Davis", "john.davis@email.com");
        Student student2 = new Student("S002", "Sarah Wilson", "sarah.wilson@email.com");
        Student student3 = new Student("S003", "Michael Brown", "michael.brown@email.com");

        // Display Student Profiles
        System.out.println("===== Student Profiles =====");
        student1.printProfile();
        student2.printProfile();
        student3.printProfile();
    }
}
