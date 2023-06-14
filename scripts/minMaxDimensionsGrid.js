// Create an empty ZingGrid instance
const minMaxGrid = document.getElementById('minMaxGrid');

// Fetch data from the endpoint
fetch('https://reporting.esukartocse135.com/api/data/min-max-dimensions-data', {
    headers: {
        'auth-token': sessionStorage.getItem('auth_token')
    },
})
    .then(response => response.json())
    .then(data => {
        minMaxGrid.setData(data);
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
