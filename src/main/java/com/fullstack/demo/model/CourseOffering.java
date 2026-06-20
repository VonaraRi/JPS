package src.main.java.com.fullstack.demo.model;

public class CourseOffering {
    private String offeringId;
    private String offeringName;
    private Course course;
    private Instructor instructor;
    private String startDate;
    private String endDate;
    private int capacity;
    private String deliveryMode;

    // Constructor
    public CourseOffering(String offeringId, String offeringName, Course course, 
                          Instructor instructor, String startDate, String endDate, int capacity, String deliveryMode) {
        this.offeringId = offeringId;
        this.offeringName = offeringName;
        this.course = course;
        this.instructor = instructor;
        this.startDate = startDate;
        this.endDate = endDate;
        this.capacity = capacity;
        this.deliveryMode = deliveryMode;
    }

    // Getter Methods
    public String getOfferingId() {
        return offeringId;
    }

    public String getOfferingName() {
        return offeringName;
    }

    public Course getCourse() {
        return course;
    }

    public Instructor getInstructor() {
        return instructor;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public int getCapacity() {
        return capacity;
    }

    public String getDeliveryMode() {
        return deliveryMode;
    }

    public void printOfferingSummary() {
        System.out.println("Offering ID: " + offeringId 
        + ", Offering Name: " + offeringName 
        + "\nCourse: " + course.getTitle() 
        + "\nInstructor: " + instructor.getInstructorName() 
        + "\nStart Date: " + startDate 
        + "\nEnd Date: " + endDate 
        + "\nCapacity: " + capacity 
        + "\nDelivery Mode: " + deliveryMode);
    }
}
