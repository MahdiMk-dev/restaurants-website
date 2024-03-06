document.addEventListener('DOMContentLoaded', function () {
    const signInForm = document.querySelector('.form-container.sign-in form');
    const adminCheckbox = document.getElementById('adminCheckbox');

    signInForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const enteredUsername = document.querySelector('.form-container.sign-in input[type="text"]').value;
        const enteredPassword = document.querySelector('.form-container.sign-in input[type="password"]').value;

        const isAdminLogin = adminCheckbox.checked;

        if (isAdminLogin) {
            const adminCredentials = { username: 'admin', password: 'admin123' };

            if (enteredUsername === adminCredentials.username && enteredPassword === adminCredentials.password) {
                alert('Admin Login successful!');
                window.location.href = "../pages/admin.html";
            } else {
                alert('Invalid admin credentials. Please try again.');
            }
        } else {
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser && enteredUsername === storedUser.username && enteredPassword === storedUser.password) {
                alert('Login successful!');
                window.location.href = "../pages/main.html";
            } else {
                alert('Invalid username or password. Please try again.');
            }
        }
    });
});
