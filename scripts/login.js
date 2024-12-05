document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate a login API request with user data including roles
    const users = [
        { username: "admin", password: "password123", role: "admin" },
        { username: "manager", password: "manager123", role: "manager" }
    ];

    // Find the user from the simulated database
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Store the user's role (this can be stored in localStorage, sessionStorage, or a cookie)
        localStorage.setItem('userRole', user.role);

        // Redirect based on user role
        if (user.role === "admin") {
            window.location.href = "dashboard-admin.html";  // Admin dashboard
        } else if (user.role === "manager") {
            window.location.href = "dashboard-manager.html";  // Manager dashboard
        }
    } else {
        document.getElementById('error-message').textContent = "Invalid username or password";
    }
});