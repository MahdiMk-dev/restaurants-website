console.log(localStorage)

document.addEventListener('DOMContentLoaded', function () {
    const signInForm = document.querySelector('.form-container.sign-in form');

    const signInLink = document.querySelector('.sign-in-link');


    signInForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const enteredUsername = document.querySelector('.form-container.sign-in input[type="text"]').value;
        const enteredPassword = document.querySelector('.form-container.sign-in input[type="password"]').value;

        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && enteredUsername === storedUser.username && enteredPassword === storedUser.password) {
            alert('Login successful!');
            window.location.href = "../pages/main.html";
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });
});
