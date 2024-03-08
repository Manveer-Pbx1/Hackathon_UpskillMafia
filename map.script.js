// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Mapbox map
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // Choose your preferred map style
        center: [-74.5, 40], // Default center coordinates
        zoom: 9 // Default zoom level
    });

    // Handle form submission
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(searchForm);
        const city = formData.get('city');
        const sports = formData.getAll('sports');

        try {
            // Fetch users based on city and sports
            const response = await fetch(`/api/search?city=${city}&sports=${sports.join(',')}`);
            const users = await response.json();

            // Clear existing markers on the map
            map.getSource('markers').setData({
                type: 'FeatureCollection',
                features: []
            });

            // Add markers for each user
            users.forEach(user => {
                const marker = new mapboxgl.Marker()
                    .setLngLat([user.location.coordinates[0], user.location.coordinates[1]])
                    .addTo(map);
            });
        } catch (error) {
            console.error('Error searching users:', error);
        }
    });
});
