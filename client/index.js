const username = document.getElementById('username');
loginUser = (e) => {
    e.preventDefault();
    console.log(username.value);
    //check if user exists w get

    //if it doesnt exist - create user with post
    window.location.href = "game.html";
};