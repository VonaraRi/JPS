package src.main.java.com.fullstack.demo.exception;

public class DuplicateCourseException extends RuntimeException{
    public DuplicateCourseException(String message){
        super(message);
    }
}