function signup() {
    let username = document.getElementById("signupUsername").value;
    let password = document.getElementById("signupPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username already exists
    if (users.some(u => u.username === username)) {
        alert("Username already exists. Please choose a different one.");
        return;
    }
    //store passwords as hashed for security purposes
    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(password, salt);
    
    users.push({ username, password: hashedPassword, salt });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign up successful! You can now log in.");

    window.location.href = "../main.html";
}