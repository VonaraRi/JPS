package src.main.java.com.fullstack;

public class Main {
    public static void main (String[] args){
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
        System.out.println();
        System.out.println("===== Instructor Profiles =====");
        System.out.println();
        instructor1.printProfile();
        System.out.println();
        instructor2.printProfile();
        System.out.println();
        instructor3.printProfile();
    }
}
