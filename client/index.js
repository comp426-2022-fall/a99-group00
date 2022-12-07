const username = document.getElementById('username');
loginUser = (e) => {
    e.preventDefault();
    sessionStorage.setItem("username1", username.value);
    //check if user exists w get

    //if it doesnt exist - create user with post
    window.location.href = "game.html";
};