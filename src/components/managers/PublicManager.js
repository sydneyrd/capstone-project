export const getPublicCalculatedRosters = (setRosters) => {
    return fetch(`REACT_APP_API
/public-rosters`, {
        method: "GET",
    })
        .then(res => res.json())
        .then((res) => {setRosters(res)})
}
export const getPublicCalculatedRoster = (calculatedRosterId, setRosters) => {
    return fetch(`REACT_APP_API
/public-rosters/${calculatedRosterId}`, {
        method: "GET",
    })
        .then(res => res.json())
}



export const getPublicCalculatedRosterChar = (calculatedRosterId, setRosters) => {
    return fetch(`REACT_APP_API
/public-roster-choices?calculatedroster=${calculatedRosterId}`, {
    })
        .then(res => res.json())
}

export const getPublicServers = (setServers) => {
    return fetch(`REACT_APP_API
/public/servers`, {
        method: "GET",
    })
        .then(res => res.json())
        .then((res) => {setServers(res)})
}

export const getPublicWeapons = (setWeapons) => {
    return fetch(`REACT_APP_API
/public/weapons`, {
        method: "GET",
    })
        .then(res => res.json())
        .then((res) => {setWeapons(res)})
}
export const getPublicRoles = (setRoles) => {
    return fetch(`REACT_APP_API
/public/roles`, {
        method: "GET",
    })
        .then(res => res.json())
        .then((res) => {setRoles(res)})
}
export const getPublicFactions = (setFactions) => {
    return fetch(`REACT_APP_API
/public/factions`, {
        method: "GET",
    })
        .then(res => res.json())
        .then((res) => {setFactions(res)})
}
export const addSharedCharacter = (newCharacter, token) => {
    return fetch(`REACT_APP_API
/shared_character_create/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCharacter)
})
    .then(res => res.json())
}
