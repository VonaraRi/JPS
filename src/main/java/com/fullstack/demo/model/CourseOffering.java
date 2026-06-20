package src.main.java.com.fullstack.demo.model;

public class CourseOffering {
    private String offeringId;
    private String offeringName;
    private Course course;
    private Instructor instructor;
    private String startDate;
    private String endDate;
    private int capacity;
    private String deliveryMode; // e.g. "Online", "In-Person"

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

    private static String requireText(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(fieldName + " is required.");
        }
        return value.trim();
    }

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

    public void printSummary() {
        System.out.println("Offering ID: " + offeringId);
        System.out.println("Offering Name: " + offeringName);
        System.out.println("Course: " + course.getTitle());
        System.out.println("Instructor: " + instructor.getInstructorName());
        System.out.println("Start Date: " + startDate);
        System.out.println("End Date: " + endDate);
        System.out.println("Capacity: " + capacity);
        System.out.println("Delivery Mode: " + deliveryMode);
    }

    public String getSummary() {
        return "CourseOffering {" +
                "offeringId='" + offeringId + '\'' +
                ", offeringName='" + offeringName + '\'' +
                ", course='" + course.getTitle() + '\'' +
                ", instructor='" + instructor.getInstructorName() + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", capacity=" + capacity +
                ", deliveryMode='" + deliveryMode + '\'' +
                '}';
    }
}
