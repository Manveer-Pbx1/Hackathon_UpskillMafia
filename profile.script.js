// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(profileForm);
        const userData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                console.log('User details submitted successfully');
                // Redirect to a success page or perform another action
            } else {
                console.error('Failed to submit user details');
            }
        } catch (error) {
            console.error('Error submitting user details:', error);
        }
    });
});

// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const cricketPlayersList = document.getElementById('cricketPlayers');

    // Fetch cricket players from the server
    fetch('/api/cricket')
        .then(response => response.json())
        .then(cricketPlayers => {
            cricketPlayers.forEach(player => {
                const listItem = document.createElement('li');
                listItem.textContent = `Name: ${player.name}, Email: ${player.email}, Age: ${player.age}, City: ${player.city}`;
                cricketPlayersList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching cricket players:', error);
        });
});

