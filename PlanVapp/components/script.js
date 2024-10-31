// script.js

document.getElementById('flightSearchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Gather user input
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('returnDate').value;

    // Prepare the API request
    const apiUrl = `YOUR_FLIGHT_API_URL?from=${from}&to=${to}&departureDate=${departureDate}&returnDate=${returnDate}`;
    
    // Fetch flight data
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON data
        })
        .then(data => {
            displayResults(data); // Display the results
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

// Function to display results
function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    // Check if data is returned
    if (data.length === 0) {
        resultsDiv.innerHTML = '<p>No flights found.</p>';
        return;
    }

    // Create elements to display each flight
    data.forEach(flight => {
        const flightDiv = document.createElement('div');
        flightDiv.innerHTML = `
            <p>Flight from ${flight.from} to ${flight.to}</p>
            <p>Departure: ${flight.departureDate}</p>
            <p>Return: ${flight.returnDate || 'N/A'}</p>
            <p>Price: ${flight.price}</p>
            <hr>
        `;
        resultsDiv.appendChild(flightDiv);
    });
}
