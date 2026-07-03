const events = [
  {
    id: "EV001",
    title: "Tech Career Fair",
    date: "2026-08-10",
    venue: "Kuala Lumpur Convention Centre",
    availableSeats: 120
  },
  {
    id: "EV002",
    title: "Web Development Bootcamp",
    date: "2026-08-15",
    venue: "Digital Learning Hub",
    availableSeats: 35
  },
  {
    id: "EV003",
    title: "AI for Business Workshop",
    date: "2026-08-20",
    venue: "Innovation Centre",
    availableSeats: 50
  }
];

// Write your code below this line

// REQUIREMENT 1: Select the event list/DOM element from the HTML.
const eventList = document.getElementById('eventList');

// REQUIREMENT 2: Select the status text element from the HTML.
const statusText = document.getElementById('statusText');

// REQUIREMENT 3: Display every event inside the unordered list.
// The forEach loop iterates through the events and appends each one to the list.
events.forEach(event => {
    // Create a new list item element for each event.
    const listItem = document.createElement('li');

    // REQUIREMENT 4: Each event must show title, date, venue, and available seats.
    // This line constructs the string with all the required event details.
    let eventText = `${event.title} - ${event.date} - ${event.venue} - ${event.availableSeats} seats available`;

    // Challenge Task: Add a note for events with limited seats.
    if (event.availableSeats < 50) {
        eventText += ' - Limited seats';
    }

    // Set the text of the list item and append it to the list.
    listItem.textContent = eventText;
    eventList.appendChild(listItem);
});

// REQUIREMENT 5: Update the status text after the events are displayed.
statusText.textContent = `${events.length} event(s) displayed.`;