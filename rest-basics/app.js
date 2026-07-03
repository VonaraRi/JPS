const API_BASE_URL = "http://localhost:8081/api";

// --- DOM Element Selection ---
const eventList = document.getElementById('eventList');
const statusText = document.getElementById('statusText');

/**
 * Renders an array of events to the page.
 * @param {Array<object>} eventsArray - The array of event objects to display.
 */
function renderEvents(eventsArray) {
  // Clear the list before rendering to avoid duplicates
  eventList.innerHTML = '';

  if (eventsArray.length === 0) {
    eventList.innerHTML = '<li>No events found.</li>';
    return;
  }

  eventsArray.forEach(event => {
    const listItem = document.createElement('li');
    let eventText = `${event.title} - ${event.date} - ${event.venue} - ${event.availableSeats} seats available`;

    // Add a note for events with limited seats
    if (event.availableSeats < 50) {
      eventText += ' - Limited seats';
    }

    listItem.textContent = eventText;
    eventList.appendChild(listItem);
  });
}

/**
 * Fetches all events from the API and displays them.
 */
async function loadAllEvents() {
  statusText.textContent = "Loading events..."; // Show loading status
  try {
    const response = await fetch(`${API_BASE_URL}/events`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const events = await response.json();
    renderEvents(events);
    statusText.textContent = `${events.length} event(s) displayed.`; // Show success message
  } catch (error) {
    console.error("Failed to load events:", error);
    statusText.textContent = "Error: Could not load events."; // Show error message
    eventList.innerHTML = ''; // Clear the list on error
  }
}

/**
 * --- CHALLENGE TASK IMPLEMENTATION ---
 * Dynamically creates and adds search UI to the page.
 */
function createSearchUI() {
  const searchContainer = document.createElement('div');
  searchContainer.style.marginTop = '20px';

  const searchInput = document.createElement('input');
  searchInput.id = 'eventIdInput';
  searchInput.type = 'text';
  searchInput.placeholder = 'Enter Event ID (e.g., EV001)';

  const searchButton = document.createElement('button');
  searchButton.textContent = 'Find Event';

  const resetButton = document.createElement('button');
  resetButton.textContent = 'Show All Events';

  searchContainer.append(searchInput, searchButton, resetButton);
  statusText.insertAdjacentElement('afterend', searchContainer);

  // Add event listeners
  searchButton.addEventListener('click', async () => {
    const eventId = searchInput.value.trim();
    if (!eventId) {
      statusText.textContent = "Please enter an Event ID.";
      return;
    }

    statusText.textContent = `Searching for event ${eventId}...`;
    try {
      const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
      if (response.status === 404) {
        statusText.textContent = `Event with ID "${eventId}" was not found.`;
        eventList.innerHTML = '';
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const event = await response.json();
      renderEvents([event]); // renderEvents expects an array
      statusText.textContent = `Displaying event ${eventId}.`;
    } catch (error) {
      console.error("Failed to search for event:", error);
      statusText.textContent = "Error: Could not perform search.";
    }
  });

  resetButton.addEventListener('click', loadAllEvents);
}

// --- Initial Page Load ---
loadAllEvents();
createSearchUI();