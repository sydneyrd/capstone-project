export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
        .then(res => res.json())
}
export const getUserbyId = (id) => {
    return fetch(`http://127.0.0.1:8000/rosterusers/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}
export const postNewUser = (user) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}
export const updateProfile = (profile, id) => {
    return fetch(`http://127.0.0.1:8000/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        },
        body: JSON.stringify(profile)
    })
        .then(response => response.json())
}
export const getUserWarStats = (user) => {
    return fetch(`http://127.0.0.1:8000/calculatedrosters?user=${user.id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}
export const getUserCharacters = (user) => {
    return fetch(`http://127.0.0.1:8000/characters?user=${user.id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}
export const getUserRosters = (user, setRosters) => {
    return fetch(`http://127.0.0.1:8000/rosters?user=${user.id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}