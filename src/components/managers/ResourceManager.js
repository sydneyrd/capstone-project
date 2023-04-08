const apiKey = process.env.REACT_APP_API;
export const getAllWeapons = (setWeapons) => {
    return fetch(`${apiKey}
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
    return fetch(`${apiKey}
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
    return fetch(`${apiKey}
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
    return fetch(`${apiKey}
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