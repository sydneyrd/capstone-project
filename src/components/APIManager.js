export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
        .then(res => res.json())
}

export const getUserbyId = (id) => {
    return fetch(`http://127.0.0.1:8000/users/${id}`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("roster_token")}`}
    })
        .then(res => res.json())
}
export const getUserCharacters = (user) => {
    return fetch(`http://127.0.0.1:8000/characters?user=${user.id}`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("roster_token")}`}
    })
        .then(res => res.json())

}

export const getUserRosters = (user) => {
    return fetch(`http://127.0.0.1:8000/rosters?user=${user.id}`,{
        headers:{
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())

}

export const getCurrentRoster = (rosterId) => {
    return fetch(`http://127.0.0.1:8000/rosterchoices?roster=${rosterId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())

}

export const getUserWarStats = (user) => {
    return fetch(`http://127.0.0.1:8000/calculatedrosters?user=${user.id}`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("roster_token")}`}
    })
        .then(res => res.json())
}
//post new user fix during auth adjustments
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
//auth fixes as well probably
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
export const getAllWeapons = (setWeapons) => {
    return fetch(`http://127.0.0.1:8000/weapons`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("roster_token")}`}
    })
        .then(res => res.json())
        .then((weaponsArr) => {
            setWeapons(weaponsArr)
        })
}

export const getAllRoles = (setRoles) => {
    return fetch(`http://127.0.0.1:8000/roles`, {headers:{
        "Authorization": `Token ${localStorage.getItem("roster_token")}`
    }})
        .then(res => res.json())
        .then((roleArr) => {
            setRoles(roleArr)
        })
}
export const getAllServers = (setServers) => {
    return fetch(`http://127.0.0.1:8000/servers`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("roster_token")}`}
    })
        .then(res => res.json())
        .then((serverArr) => {
            setServers(serverArr)
        })
}

export const getAllFactions = (setFactions) => {
    return fetch(`http://127.0.0.1:8000/factions`,
    {headers:{
        "Authorization": `Token ${localStorage.getItem("roster_token")}`
    }})
        .then(res => res.json())
        .then((factionArr) => {
            setFactions(factionArr)
        })
}
export const getAllCharacters = (setCharacters) => {
    return fetch(`http://127.0.0.1:8000/characters`,{
    headers:{
        "Authorization": `Token ${localStorage.getItem("roster_token")}`}
    })
        .then(res => res.json())
        .then((charactersArr) => {
            setCharacters(charactersArr)
        })
}

export const getSingleCharacter = (characterId, setCharacter) => {
    return fetch(`http://127.0.0.1:8000/characters/${characterId}`,{
        headers:{
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
        .then((character) => {
            setCharacter(character)
        })
    //no set function included in this don't forget .then
}
export const getRosterCharacter = (rosterNum) => {
    return fetch(`http://127.0.0.1:8000/rosterchoices?roster=${rosterNum}`,
    {headers:{
        "Authorization": `Token ${localStorage.getItem("roster_token")}`
    }})
        .then(res => res.json())
    //no set function included in this don't forget .then
}
export const getCalculatedRoster = (calculatedrosterId) => {
    return fetch(`http://127.0.0.1:8000/calculatedrosters/${calculatedrosterId}`,
    {headers:{
        "Authorization": `Token ${localStorage.getItem("roster_token")}`
    }})
        .then(res => res.json())
}

export const getCalculatedRosterChar = (calculatedRosterId) => {
    return fetch(`http://127.0.0.1:8000/calculatedrosterchoices?calculatedroster=${calculatedRosterId}`,{
        headers:{
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
    //no set function included in this don't forget .then
}

export const getRosterName = (rosterId) => {
    return fetch(`http://127.0.0.1:8000/rosters/${rosterId}`,
    {headers:{
        "Authorization": `Token ${localStorage.getItem("roster_token")}`
    }})
        .then(res => res.json())
}

export const saveNewCharacter = (newCharacterToAPI) => {
    return fetch(`http://127.0.0.1:8000/characters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        },
        body: JSON.stringify(newCharacterToAPI)
    })
        .then(res => res.json())
}

export const newRosterChoice = (newRosterChoiceObj) => {
    return fetch(`http://127.0.0.1:8000/rosterchoices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        },
        body: JSON.stringify(newRosterChoiceObj)
    })
        .then(res => res.json())
}
//double check thsese new calc picks//
export const newCalculatedRosterChoices = (newRosterChoiceObj) => {
    return fetch(`http://127.0.0.1:8000/calculatedrosterchoices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        },
        body: JSON.stringify(newRosterChoiceObj)
    })
        .then(res => res.json())
}

export const newRoster = (newRosterObj) => {
    return fetch(`http://127.0.0.1:8000/rosters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        },
        body: JSON.stringify(newRosterObj)
    })
        .then(res => res.json())
}

export const newCalculatedRoster = (newRosterObj) => {
    return fetch(`http://127.0.0.1:8000/calculatedrosters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        },
        body: JSON.stringify(newRosterObj)
    })
        .then(res => res.json())
}

export const deleteRosterChoice = (rosterChoiceId) => {
    return fetch(`http://127.0.0.1:8000/rosterchoices/${rosterChoiceId}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        }
    })
}

export const deleteCharacter = (deleteCharacterId) => {
    return fetch(`http://127.0.0.1:8000/characters/${deleteCharacterId}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        }
    }
    )
}

export const deleteRoster = (rosterId) => {
    return fetch(`http://127.0.0.1:8000/rosters/${rosterId}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('roster_token')}`
        }

    }
    )
}

//we are going to PUT our Roster's name with a text field

export const putRosterName = (id, rosterName) => {
    return fetch(`http://127.0.0.1:8000/rosters/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        },
        body: JSON.stringify(rosterName)
    })
        
}

export const deleteCalculatedRoster = (calculatedRosterId) => {
    fetch(`http://127.0.0.1:8000/calculatedrosters/${calculatedRosterId}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        }

    }
    )
}

export const putCharacter = (uCharacter, id) => {
    return fetch(`http://127.0.0.1:8000/characters/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        },
        body: JSON.stringify(uCharacter)
    })
        
}

export const loginUser = (user) => {
    return fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const registerUser = (user) => {
    return fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const newLink = (link) => {
    return fetch(`http://127.0.0.1:8000/links`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        },
        body: JSON.stringify(link)
    })
        .then(res => res.json())
}