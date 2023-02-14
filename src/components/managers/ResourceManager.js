export const getAllWeapons = (setWeapons) => {
    return fetch(`http://127.0.0.1:8000/weapons`, {
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
    return fetch(`http://127.0.0.1:8000/roles`, {
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
    return fetch(`http://127.0.0.1:8000/servers`, {
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
    return fetch(`http://127.0.0.1:8000/factions`,
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