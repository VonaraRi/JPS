package src.main.java.com.fullstack.demo.exception;

public class InvalidCourseException extends RuntimeException{
    public InvalidCourseException(String message){
        super(message);
    }
    
}
