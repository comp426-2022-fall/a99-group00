let USER = ""

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

