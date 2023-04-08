
export const newRoster = () => {
    return fetch(`REACT_APP_API
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
    return fetch(`REACT_APP_API
/rosters/${rosterId}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roster_token")}`
            }
        })
        .then(res => res.json())
}

export const newRosterChoice = (newRosterChoiceObj) => {
    return fetch(`REACT_APP_API
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
        // .catch(error => {
        //     console.error('Error:', error);
        //     alert("This player has already been added.");
        // });
};


export const deleteRoster = (rosterId) => {
    return fetch(`REACT_APP_API
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
    return fetch(`REACT_APP_API
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
    return fetch(`REACT_APP_API
/rosterchoices?roster=${rosterNum}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roster_token")}`
            }
        })
        .then(res => res.json())
}
export const deleteRosterChoice = (rosterChoiceId) => {
    return fetch(`REACT_APP_API
/rosterchoices/${rosterChoiceId}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        }
    })
}
export const getCurrentRoster = (rosterId) => {
    return fetch(`REACT_APP_API
/rosterchoices?roster=${rosterId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}
