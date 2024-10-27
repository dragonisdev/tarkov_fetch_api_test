document.getElementById('searchButton').addEventListener('click', function() {
    // Get the value from the input field
    const itemName = document.getElementById('itemInput').value;

    // Check if the input is not empty
    if (itemName.trim() === '') {
        alert('Please enter an item name.');
        return;
    }

    // Fetch request with the user's input as the item name
    fetch('https://api.tarkov.dev/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `{
                items(name: "${itemName}") {
                    id
                    name
                    shortName
                }
            }`
        })
    })
    .then(r => r.json())
    .then(data => {
        console.log('data returned:', data);

        // Display the result in the "results" div
        const resultsDiv = document.getElementById('results');
        if (data.data.items.length > 0) {
            resultsDiv.innerHTML = `
                <h3>Item Found:</h3>
                <p>Item ID: ${data.data.items[0].id}</p>
                <p>Item Name: ${data.data.items[0].name}</p>
                <p>Short Name: ${data.data.items[0].shortName}</p>
            `;
        } else {
            resultsDiv.innerHTML = `<p>No items found with the name "${itemName}".</p>`;
        }
    })
    .catch(error => console.error('Error:', error));
});