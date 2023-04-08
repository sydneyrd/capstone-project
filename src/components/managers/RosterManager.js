const apiKey = process.env.REACT_APP_API;
export const newRoster = () => {
    return fetch(`${apiKey}
/rosters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}

export const getRosterName = (rosterId) => {
    return fetch(`${apiKey}
/rosters/${rosterId}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roster_token")}`
            }
        })
        .then(res => res.json())
}

export const newRosterChoice = (newRosterChoiceObj) => {
    return fetch(`${apiKey}
/rosterchoices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        },
        body: JSON.stringify(newRosterChoiceObj)
    })
        .then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.json();
        })
};


export const deleteRoster = (rosterId) => {
    return fetch(`${apiKey}
/rosters/${rosterId}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('roster_token')}`
        }
    }
    )
}

export const putRosterName = (id, rosterName) => {
    return fetch(`${apiKey}
/rosters/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        },
        body: JSON.stringify(rosterName)
    })
}
export const getRosterCharacter = (rosterNum) => {
    return fetch(`${apiKey}
/rosterchoices?roster=${rosterNum}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roster_token")}`
            }
        })
        .then(res => res.json())
}
export const deleteRosterChoice = (rosterChoiceId) => {
    return fetch(`${apiKey}
/rosterchoices/${rosterChoiceId}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        }
    })
}
export const getCurrentRoster = (rosterId) => {
    return fetch(`${apiKey}
/rosterchoices?roster=${rosterId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}
