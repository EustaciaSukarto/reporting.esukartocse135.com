// Create an empty ZingGrid instance
const userLanguageGrid = document.getElementById('userLanguageGrid');

// Fetch data from the endpoint
fetch('https://reporting.esukartocse135.com/api/data/user-language-data', {
    headers: {
        'auth-token': sessionStorage.getItem('auth_token')
    },
})
    .then(response => response.json())
    .then(data => {
        userLanguageGrid.setData(data);
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
