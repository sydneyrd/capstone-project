const apiKey = process.env.REACT_APP_API;

export const getUserWarStats = () => {
    return fetch(`${apiKey}
/calculatedrosters?user_param=user`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}
export const getUserCharacters = () => {
    return fetch(`${apiKey}
/characters?user=user`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}
export const getUserRosters = (setRosters) => {
    return fetch(`${apiKey}
/rosters?user=user`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json()).then((res) => {setRosters(res)})
}

export const generateToken = () => {
    return fetch(`${apiKey}
/generate_shared_character_token`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })      
}

export const generateShareRosterToken = (body) => {
    return fetch(`${apiKey}/generate_shared_calculated_roster_token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        },
        body: JSON.stringify(body)
    })
}
export const createSharedCalculatedRosterChoice = (body, token) => {
    return fetch(`${apiKey}/shared_calculated_roster_choice_create/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        },
        body: JSON.stringify(body)
    })
}