const baseUrl = "http://localhost:5000"

fetch(`${baseUrl}/profiles`)
.then(res => res.json())
.then(res => {
    let profilesHolder= document.getElementById("profiles")
    const profiles = res

    profiles.forEach(profile => {
        var card = `<div class="card" style="width: 18rem;">
                        <div class="card-body">
                        <h5 class="card-title">${profile.firstname} ${profile.lastname}</h5>
                        <p class="card-text">${profile.age}</p>
                        <p class="card-text text-muted">${profile.email}</p>
                        <p class="card-text">${profile.isStudent}</p>
                        <p class="card-text">${profile.username}</p>
                        <h6 class="card-text">${profile.password}</h6>
                        </div>
                    </div>`

        profilesHolder.innerHTML += card
    });

})