
public class JavaDemo{
    public static void main(String[] args){
        System.out.println("Hello World!");

        //This is Primative data type
        //Store in stack memory
        int number = 10;
        double pi = 3.14159;
        boolean isTrue = true;
        char character = 'A';
        byte smallNumber = 127; //8-bit signed integer
        short mediumNumber = 32767; //16 bit signed integer 32768 to 32767
        long largerNumber = 93323232242342234L; //64 bits
        float floatNumber = 3.14f; //32 bit signed floating point

        // Reference data types in Java
        String text = "Hello, World!"; // A sequence of characters. Strings are objects
        Object obj = new Object();
        int[] numbers = {1, 2, 3, 4};
        double[] decimalNumbers = {1.1, 2.2, 3.3, 4.4};
        String[] words = {"apple", "banana", "cherry"}; //An array of strings
        String[] emptyArray = new String[5]; // An empty array of strings with a length of 5
    }
}