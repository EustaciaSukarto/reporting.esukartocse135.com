// Create an empty ZingGrid instance
const dimensionsGrid = document.getElementById('dimensionsGrid');

// Fetch data from the endpoint
fetch('https://reporting.esukartocse135.com/api/data/dimensions-data', {
    headers: {
        'auth-token': sessionStorage.getItem('auth_token')
    },
})
    .then(response => response.json())
    .then(data => {
        dimensionsGrid.setData(data);
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
