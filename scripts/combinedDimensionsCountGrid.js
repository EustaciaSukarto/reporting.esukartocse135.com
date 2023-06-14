// Create an empty ZingGrid instance
const combinedDimensionsGrid = document.getElementById('combinedDimensionsGrid');

// Fetch data from the endpoint
fetch('https://reporting.esukartocse135.com/api/data/combined-dimensions-data', {
    headers: {
        'auth-token': sessionStorage.getItem('auth_token')
    },
})
    .then(response => response.json())
    .then(data => {
        combinedDimensionsGrid.setData(data);
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
