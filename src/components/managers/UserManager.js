// export const getUserbyId = () => {
//     return fetch(`http://127.0.0.1:8000/rosterusers/id`, {
//         headers: {
//             "Authorization": `Token ${localStorage.getItem("roster_token")}`
//         }
//     })
//         .then(res => res.json())
// }
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
export const updateProfile = (profile) => {
    return fetch(`http://127.0.0.1:8000/users/id`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        },
        body: JSON.stringify(profile)
    })
        .then(response => response.json())
}
export const getUserWarStats = () => {
    return fetch(`http://127.0.0.1:8000/calculatedrosters?user_param=user`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}
export const getUserCharacters = () => {
    return fetch(`http://127.0.0.1:8000/characters?user=user`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}
export const getUserRosters = (setRosters) => {
    return fetch(`http://127.0.0.1:8000/rosters?user=user`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json()).then((res) => {setRosters(res)})
}

export const generateToken = () => {
    return fetch(`http://127.0.0.1:8000/generate_shared_character_token`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })      
}

export const generateShareRosterToken = (body) => {
    return fetch(`http://127.0.0.1:8000/generate_shared_calculated_roster_token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        },
        body: JSON.stringify(body)
    })
}
export const createSharedCalculatedRosterChoice = (body, token) => {
    return fetch(`http://127.0.0.1:8000/shared_calculated_roster_choice_create/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        },
        body: JSON.stringify(body)
    })
}