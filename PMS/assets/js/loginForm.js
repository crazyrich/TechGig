$("#login-button").click(function (event) {
    event.preventDefault();

    if (document.getElementById("user").value == "admin" && document.getElementById("pass").value == "admin") {
        location.href = "index.html";
    }
    else {
        document.getElementById("spanError").innerHTML = "Invalid Credentials!";
        document.getElementById("spanErrorMsg").innerHTML = "Please enter a valid Username/Password.";
    }
});

