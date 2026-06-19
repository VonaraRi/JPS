# Course Management System - E2

## Output

![Course Information Output](./Screenshot%202026-06-19%20221255.png)

## Changes Made

### Course.java Updates

1. **Added Category Field**
   - Declared `private String category` to store the course category (e.g., Programming, Database, Frontend)
   - Updated constructor to accept and initialize the category parameter

2. **Added Active Status Field**
   - Declared `private boolean active` to track whether a course is active or inactive
   - Updated constructor to accept and initialize the active status
   - Added getter method `getActive()` to retrieve the boolean value

3. **Enhanced Print Summary**
   - Modified `printSummary()` method to display the category
   - Used ternary operator to convert boolean `active` status to readable format:
     - `true` displays as **"Active"**
     - `false` displays as **"Inactive"**

### Main.java Updates

- Created course objects with both `category` and `active` parameters
- Each course now properly initializes with its category type and active status
- The program demonstrates courses with both Active and Inactive statuses

This enhancement allows better course classification and management by adding category information and operational status tracking.
