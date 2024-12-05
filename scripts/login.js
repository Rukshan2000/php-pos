document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate a login API request with JSON
    const loginData = {
        username: "admin",
        password: "password123"
    };

    // Check credentials
    if (username === loginData.username && password === loginData.password) {
        // Redirect to dashboard.html on successful login
        window.location.href = "dashboard.html"; 
    } else {
        document.getElementById('error-message').textContent = "Invalid username or password";
    }
});
