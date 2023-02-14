
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

export const getRosterName = (rosterId) => {
    return fetch(`http://127.0.0.1:8000/rosters/${rosterId}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roster_token")}`
            }
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
export const getRosterCharacter = (rosterNum) => {
    return fetch(`http://127.0.0.1:8000/rosterchoices?roster=${rosterNum}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roster_token")}`
            }
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
export const getCurrentRoster = (rosterId) => {
    return fetch(`http://127.0.0.1:8000/rosterchoices?roster=${rosterId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}
