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
export const getAllWeapons = (setWeapons) => {
    return fetch(`http://localhost:8088/weapons`)
    .then(res => res.json())
    .then((weaponsArr) => {
        setWeapons(weaponsArr)
    })
}

export const getAllRoles = (setRoles) => {
    return fetch(`http://localhost:8088/roles`)
    .then(res => res.json())
    .then((roleArr) => {
        setRoles(roleArr)
    })
}
export const getAllServers = (setServers) => {
    return fetch(`http://localhost:8088/servers`)
    .then(res => res.json())
    .then((serverArr) => {
        setServers(serverArr)
    })
}

export const getAllFactions = (setFactions) => {
    return fetch(`http://localhost:8088/factions`)
    .then(res => res.json())
    .then((factionArr) => {
        setFactions(factionArr)
    })
}
export const getAllCharacters = (setCharacters) => {
    return fetch(`http://localhost:8088/characters`)
    .then(res => res.json())
    .then((charactersArr) => {
        setCharacters(charactersArr)
    })
}
export const getRosterCharacter = (rosterNum) => {
    return fetch(`http://localhost:8088/rosterchoices?&rosterId=${rosterNum}`)
    .then(res => res.json())
    //no set function included in this don't forget .then
}

export const saveNewCharacter = (newCharacterToAPI) => {
    return fetch(`http://localhost:8088/characters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(newCharacterToAPI)
    })
    .then(res => res.json())
}

export const newRosterChoice = (newRosterChoiceObj) => {
    return fetch(`http://localhost:8088/rosterchoices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRosterChoiceObj)
    })
    .then(res => res.json())
}

export const newRoster = (newRosterObj) => {
    return fetch(`http://localhost:8088/rosters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRosterObj)
    })
    .then(res => res.json())
}

export const deleteRosterChoice = (rosterChoice) => {
      fetch(`http://localhost:8088/rosterchoices?&characterId=${rosterChoice}`, {
        method: "DELETE",
    })
}

