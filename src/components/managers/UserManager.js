export const getUserbyId = () => {
    return fetch(`REACT_APP_API
/rosterusers/id`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}
export const postNewUser = (user) => {
    return fetch(`REACT_APP_API/users`, {
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
    return fetch(`REACT_APP_API
/users/id`, {
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
    return fetch(`REACT_APP_API
/calculatedrosters?user_param=user`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}
export const getUserCharacters = () => {
    return fetch(`REACT_APP_API
/characters?user=user`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}
export const getUserRosters = (setRosters) => {
    return fetch(`REACT_APP_API
/rosters?user=user`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json()).then((res) => {setRosters(res)})
}

export const generateToken = () => {
    return fetch(`REACT_APP_API
/generate_shared_character_token`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })      
}