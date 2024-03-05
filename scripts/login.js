document.addEventListener("DOMContentLoaded", function() {
    // Add an event listener to the login button
    document.getElementById("loginbtn").addEventListener("click", login);
function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;
    console.log(username)
    console.log(password)
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.username === username && u.password === password);
    console.log(u.username)
    console.log(u.password)
    if (user) {
        console.log("success")
        alert("Login successful!");
        window.location.href = "../main.html";

    } else {
        console.log("failed")

        alert("Invalid username or password. Please try again.");
    }
}
})