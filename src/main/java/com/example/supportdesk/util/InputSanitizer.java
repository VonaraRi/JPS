package com.example.supportdesk.util;

/*
Validation: what inputs are allowed and what are not

Sanitization: safely cleaning inputs before saving/validating
"   TICKET-12345   "   -> "TICKET-12345"   trim spaces
"ticket-12345"        -> "TICKET-12345"   uppercase
empty/null fields      -> return null
script tags/specials   -> strip dangerous characters
*/
public class InputSanitizer {

    private InputSanitizer() {
        // Private constructor to prevent instantiation
    }

    public static String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmedValue = value.trim();
        return trimmedValue.isEmpty() ? null : trimmedValue;
    }

    public static String cleanText(String value) {
        String trimmedValue = trimToNull(value);
        if (trimmedValue == null) {
            return null;
        }

        // Remove non-alphanumeric/non-space/non-hyphen chars and collapse multiple spaces
        String cleaned = trimmedValue
                .replaceAll("[^\\p{L}\\p{N}\\s\\-]", "")
                .replaceAll("\\s+", " ")
                .trim();

        return cleaned.isEmpty() ? null : cleaned;
    }

    public static String upperCode(String value) {
        String cleaned = cleanText(value);
        return cleaned == null ? null : cleaned.toUpperCase();
    }
}