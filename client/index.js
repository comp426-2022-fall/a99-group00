// var username1 = sessionStorage.setItem("username1", document.getElementById('loginUsername').value);

createUser = async (e) => {
    try {
        await fetch("http://localhost:9000/app/users/"+document.getElementById('loginUsername').value, {
            method: 'POST'
        })
    } catch (err) {
        console.log(err)
    }
};

findName = async (e) => {
    try {
        await fetch("http://localhost:9000/app/users/"+document.getElementById('loginUsername').value, {
            method: "GET",
            mode:"no-cors",
            header: {
            },
        }).then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
    } catch (err) {
        console.log(err)
    }
}

// Implements functionality of Login page
loginUser = async() => {
    // Get Username in textbox
    const username = document.getElementById('username').value;
    console.log(username);

    // If username is an empty string, display to user that name must be filled
    if (username === "") {
        document.getElementById("message").innerHTML = "Please enter a valid username.";
        return;
    }

    // Make a GET request with user
    const endpoint = "http://localhost:9000/app/users/" + username;
    const options = { method: "GET" }
    const response = await fetch(endpoint, options);
    const data = await response.json();

    // If user does not exist, display to user that account does not exist
    if (!data.exists) {
        document.getElementById("message").innerHTML = "User does not Exist.";
        return;
    }

    // If user exists, pass on username and number of points, and redirect to game.html
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("points", data.user.number_correct);
    window.location.replace("game.html");
}

// Implements functionality of register user page
registerUser = async() => {
    // Get Username in textbox
    const username = document.getElementById('username').value;
    console.log(username);

}

// Implements functionality of delete user page
deleteUser = async() => {
    // Get Username in textbox
    const username = document.getElementById('username').value;
    console.log(username);

    // If username is an empty string, display to user that name must be filled
    if (username === "") {
        document.getElementById("message").innerHTML = "Please enter a valid username.";
        return;
    }

    // Make a GET request with user
    const endpoint = "http://localhost:9000/app/users/" + username;
    const options = { method: "DELETE" }
    const response = await fetch(endpoint, options);
    const data = await response.json();

    // If user does not exist, display to user that account does not exist
    if (data.status == 400) {
        document.getElementById("message").innerHTML = "User does not Exist.";
    } else if (data.status == 200) {
        document.getElementById("message").innerHTML = "User was successfully deleted.";
    }
}