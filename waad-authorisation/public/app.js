    document.getElementById('register').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById('login').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        localStorage.setItem('jwt', data.token);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById('testProtected').addEventListener('click', async () => {
    const token = localStorage.getItem('jwt'); // Retrieve the token from local storage

    try {
        const response = await fetch('http://localhost:3000/api/hello', { 
            method: 'GET',
            headers: {
            'Authorization': token 
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON from the response
        console.log(data); // Log the data to the console
    } catch (error) {
        console.error('Error:', error);
    }
});


document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('jwt');
    console.log('Logged out successfully.');
});