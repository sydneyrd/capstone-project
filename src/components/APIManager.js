export const getUserByEmail= (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
}

export const getUserbyId = (id) => {
    return fetch(`http://localhost:8088/users/${id}`)
    .then(res => res.json())
}

export const postNewUser = (user) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const updateProfile = (profile, id) => {
        return fetch(`http://localhost:8088/users/${id}`, {
           method: "PUT",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify(profile)
       })
       .then(response => response.json())
    }
