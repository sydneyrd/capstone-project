export const getAllWeapons = (setWeapons) => {
    return fetch(`REACT_APP_API
/weapons`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
        .then((weaponsArr) => {
            setWeapons(weaponsArr)
        })
}

export const getAllRoles = (setRoles) => {
    return fetch(`REACT_APP_API
/roles`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
        .then((roleArr) => {
            setRoles(roleArr)
        })
}
export const getAllServers = (setServers) => {
    return fetch(`REACT_APP_API
/servers`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
        .then((serverArr) => {
            setServers(serverArr)
        })
}

export const getAllFactions = (setFactions) => {
    return fetch(`REACT_APP_API
/factions`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roster_token")}`
            }
        })
        .then(res => res.json())
        .then((factionArr) => {
            setFactions(factionArr)
        })
}