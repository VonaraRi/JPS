# REST API Investigation Report

This document outlines the results of testing the mock training API.

## API Test Results

| Method | URL                                          | Status Code     | Response Type | What Happened?                                                                                                                               |
| :----- | :------------------------------------------- | :-------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `http://localhost:8081/api/course-offerings` | `200 OK`        | List          | **Success:** The API returned the complete list of all available course offerings as a JSON array.                                           |
| `GET`  | `http://localhost:8081/api/course-offerings/CO001` | `200 OK`        | Single object | **Success:** The API found the course offering with the ID "CO001" and returned its full details as a single JSON object.                      |
| `GET`  | `http://localhost:8081/api/course-offerings/C999` | `404 Not Found` | Error object  | **Failure:** The API could not find a course offering with the ID "C999" and correctly returned a 404 error with a "not found" message.         |
| `POST` | `http://localhost:8081/api/course-offerings` | `201 Created`   | Single object | **Success:** A valid JSON payload was sent. The API created a new course offering, assigned it a new ID, and returned the new object. |
| `POST` | `http://localhost:8081/api/course-offerings` | `400 Bad Request` | Error object  | **Failure:** An invalid JSON payload (missing required fields) was sent. The API rejected it and returned a validation error message. |

---

## Questions & Answers

**1. Which request returned a successful list response?**

The request `GET http://localhost:8081/api/course-offerings` returned a successful list response with a `200 OK` status code.

**2. Which request returned a not-found response?**

The request `GET http://localhost:8081/api/course-offerings/C999` returned a `404 Not Found` response because no course exists with that specific ID.

**3. Which request returned a validation error?**

The `POST` request to `http://localhost:8081/api/course-offerings` with an invalid body (e.g., empty `courseTitle` or `capacity` of 0) returned a `400 Bad Request` validation error.

**4. What is the difference between a successful response and an error response?**

A **successful response** indicates that the server understood and fulfilled the request as expected. It typically has a status code in the 200-299 range (like `200 OK` or `201 Created`) and includes the requested data (a list or a single object) in the response body.

An **error response** indicates that the server could not process the request. It has a status code in the 400-599 range (like `404 Not Found` or `400 Bad Request`) and the response body usually contains an error object with a message explaining what went wrong.

**5. Why is the status code important for frontend developers?**

The status code is crucial for frontend developers because it is the primary, standardized way for the server to communicate the outcome of a request. It allows the frontend application to reliably determine what happened without having to inspect the response body. Based on the status code, a developer can:

*   **Handle Success (2xx):** If the code is `200 OK`, the developer knows it's safe to process the response data and display it to the user.
*   **Handle Client Errors (4xx):** If the code is `404 Not Found`, the app can show a "Not Found" page. If it's `400 Bad Request`, it can display validation error messages next to the appropriate form fields. If it's `401 Unauthorized`, it can redirect the user to a login page.
*   **Handle Server Errors (5xx):** If the code is `500 Internal Server Error`, the app can show a generic "Something went wrong, please try again later" message instead of crashing.

In short, status codes enable robust and user-friendly error handling in the application.

---

## Reflection

After this exercise, I better understand how **HTTP status codes and response bodies form a clear contract** between a client and server. Deliberately testing for errors like `404 Not Found` and `400 Bad Request` showed me that error responses are just as crucial as successful ones. A well-designed API uses status codes to communicate the outcome (`OK`, `Created`, `Not Found`) and the response body to provide details, enabling robust frontend applications that can handle both success and failure gracefully.

---



# Event Booking API Design

This document outlines the REST API design for an event booking system.

## API Specification

| Resource | Method | Endpoint              | Purpose                           | Request Body Needed? | Success Status  | Possible Error Status     |
| :------- | :----- | :-------------------- | :-------------------------------- | :------------------- | :-------------- | :------------------------ |
| Event    | `GET`  | `/events`             | Get a list of all events          | No                   | `200 OK`        | `500`                     |
| Event    | `GET`  | `/events/{eventId}`   | Get details for a specific event  | No                   | `200 OK`        | `404`, `500`              |
| Booking  | `POST` | `/bookings`           | Create a new booking for an event | Yes                  | `201 Created`   | `400`, `404`, `409`, `500`|
| Booking  | `GET`  | `/bookings`           | Get a list of all bookings        | No                   | `200 OK`        | `500`                     |
| Booking  | `GET`  | `/bookings/{bookingId}` | Get details for a specific booking  | No                   | `200 OK`        | `404`, `500`              |
| Booking  | `DELETE` | `/bookings/{bookingId}` | Cancel a specific booking         | No                   | `204 No Content`| `404`, `409`, `500`       |

## Request and Response Planning

| Endpoint      | Request Body Description                                                                                             |
| :------------ | :------------------------------------------------------------------------------------------------------------------- |
| `POST /bookings` | A JSON object containing the `eventId` of the event being booked, the `userName`, `userEmail`, and `numberOfTickets`. |

## Error Planning

| Error Case              | Related Endpoint      | Suitable Status Code | Explanation                                                                                                 |
| :---------------------- | :-------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------- |
| **Event is fully booked** | `POST /bookings`      | `409 Conflict`       | The user tried to book an event that has no remaining capacity. The server state prevents fulfilling the request. |
| **Booking already cancelled** | `DELETE /bookings/{bookingId}` | `409 Conflict`       | The user attempted to cancel a booking that is already in a "cancelled" state. No action can be taken.      |
| **Required field missing**  | `POST /bookings`      | `400 Bad Request`    | The request body was missing a required field, such as `eventId` or `userEmail`. The request is malformed.    |
| **Record does not exist**   | `GET /events/{eventId}` | `404 Not Found`      | The client requested an event with an ID that does not exist in the system.                                 |
| **Invalid quantity**        | `POST /bookings`      | `400 Bad Request`    | The `numberOfTickets` was invalid (e.g., 0 or a negative number). The request is malformed.                 |

---

## REST Principles in Endpoint Design

The endpoint names in this design follow REST principles because they are **resource-oriented nouns**, not action-based verbs. RESTful design dictates that the URL should identify the resource (e.g., `events`, `bookings`), while the HTTP method (`GET`, `POST`, `DELETE`) specifies the action to be performed on that resource.

For example, instead of using action-style URLs like `/createBooking` or `/cancelBooking`, the design uses a single resource endpoint: `/bookings`.

*   **`POST /bookings`**: The `POST` method clearly indicates the action is to **create** a new booking.
*   **`GET /bookings/{bookingId}`**: The `GET` method indicates the action is to **retrieve** a specific booking.
*   **`DELETE /bookings/{bookingId}`**: The `DELETE` method indicates the action is to **remove** a booking.

This approach makes the API predictable, scalable, and intuitive. Developers can easily guess how to interact with different resources just by understanding this fundamental pattern.

---


## Reflection

After this exercise, I better understand how **HTTP status codes and response bodies form a clear contract** between a client and server. Deliberately testing for errors like `404 Not Found` and `400 Bad Request` showed me that error responses are just as crucial as successful ones. A well-designed API uses status codes to communicate the outcome (`OK`, `Created`, `Not Found`) and the response body to provide details, enabling robust frontend applications that can handle both success and failure gracefully.