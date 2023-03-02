
export const getCalculatedRoster = (calculatedrosterId) => {
    return fetch(`http://127.0.0.1:8000/calculatedrosters/${calculatedrosterId}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roster_token")}`
            }
        })
        .then(res => res.json())
}
export const getCalculatedRosterChar = (calculatedRosterId) => {
    return fetch(`http://127.0.0.1:8000/calculatedrosterchoices?calculatedroster=${calculatedRosterId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}
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
export const editCalculatedRosterChoices = (post_body) => {
    return fetch(`http://127.0.0.1:8000/calculatedrosterchoices/${post_body.id}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        },
        body: JSON.stringify(post_body)})
}
export const deleteCalculatedRoster = (calculatedRosterId) => {
    return fetch(`http://127.0.0.1:8000/calculatedrosters/${calculatedRosterId}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        }

    }
    )
}
export const deleteCalculatedRosterChoice = (calculatedRosterChoiceId) => {
    return fetch(`http://127.0.0.1:8000/calculatedrosterchoices/${calculatedRosterChoiceId}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        }

    }
    )
}