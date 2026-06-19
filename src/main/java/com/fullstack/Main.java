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
        Course course1 = new Course("C5101", "Introduction to Computer Science", 40, "Beginner", "Programming", true);
        Course course2 = new Course("C5102", "Data Science Fundamentals", 50, "Intermediate", "Database", true);
        Course course3 = new Course("C5103", "Advanced Web Development", 60, "Advanced", "Frontend", false);

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
