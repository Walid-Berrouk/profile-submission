const form  = document.getElementById('form-submission');


form.addEventListener('submit', (event) => {
    // handle the form data
    event.preventDefault();

    const user = {
        username: form.elements['username'].value,
        password: form.elements['password'].value,
    }

    console.log(user)

    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        mode: 'cors',
        body : JSON.stringify(user),
        headers: {
          "Content-type": "application/json"
        }
    }).then(res => {
        console.log(res.token)
    })
});

// Data we have :
// usename
// password