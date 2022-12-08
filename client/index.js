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

loginUser = async() => {
    // Get Username in textbox
    const username = document.getElementById('username').value;
    console.log(username);

    // If username is an empty string, display to user that name must be filled

    // Make a GET request with user

    // If user does not exist, display to user that account does not exist


    // If user exists, get current points of user, pass on username, and redirect to game.html
    // {
    //     exists: True/False (false if does not exist)
    //     user: {
    //         "username":"Alan",
    //         "number_attempts":8,
    //         "number_correct":7,
    //         "created_at":"2022-12-07T04:46:53.000Z",
    //         "updated_at":"2022-12-07T06:50:52.000Z"
    //     } //null if does not exist
    // }

    // const username = sessionStorage.getItem("username1");
    // sessionStorage.setItem("username", username);
}

registerUser = async() => {

}

deleteUser = async() => {

}