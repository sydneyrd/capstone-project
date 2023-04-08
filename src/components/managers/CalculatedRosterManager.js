const apiKey = process.env.REACT_APP_API;

export const getCalculatedRoster = (calculatedrosterId) => {
    return fetch(`${apiKey}
/calculatedrosters/${calculatedrosterId}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roster_token")}`
            }
        })
        .then(res => res.json())
}
export const getCalculatedRosterChar = (calculatedRosterId) => {
    return fetch(`${apiKey}
/calculatedrosterchoices?calculatedroster=${calculatedRosterId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}
export const newCalculatedRosterChoices = (newRosterChoiceObj) => {
    return fetch(`${apiKey}
/calculatedrosterchoices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        },
        body: JSON.stringify(newRosterChoiceObj)
    })
        .then(res => res.json())
}
export const newCalculatedRoster = (newRosterObj) => {
    return fetch(`${apiKey}
/calculatedrosters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        },
        body: JSON.stringify(newRosterObj)
    })
        .then(res => res.json())
}
export const editCalculatedRosterChoices = (post_body) => {
    return fetch(`${apiKey}
/calculatedrosterchoices/${post_body.id}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        },
        body: JSON.stringify(post_body)})
}
export const deleteCalculatedRoster = (calculatedRosterId) => {
    return fetch(`${apiKey}
/calculatedrosters/${calculatedRosterId}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        }

    }
    )
}
export const deleteCalculatedRosterChoice = (calculatedRosterChoiceId) => {
    return fetch(`${apiKey}
/calculatedrosterchoices/${calculatedRosterChoiceId}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        }

    }
    )
}
export const editCalculatedRoster = (post_body) => {
    return fetch(`${apiKey}
/calculatedrosters/${post_body.id}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        },
        body: JSON.stringify(post_body)})
}


