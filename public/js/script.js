
const form  = document.getElementById('form-submission');


form.addEventListener('submit', (event) => {
    // handle the form data
    event.preventDefault();

    const profile = {
        firstname : form.elements['firstname'].value,
        lastname: form.elements['lastname'].value,
        age: form.elements['age'].value,
        email : form.elements['email'].value,
        isStudent : form.elements['isStudent'].checked,
        username: form.elements['username'].value,
        password: form.elements['password'].value,
    }

    console.log(profile)

    fetch('http://localhost:5000/profile', {
        method: 'POST',
        mode: 'cors',
        body : JSON.stringify(profile),
        headers: {
          "Content-type": "application/json"
        }
    })
});

// Data we have :
// firstname
// lastname
// age
// usename
// email
// password
// is student
