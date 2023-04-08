
export const getCalculatedRoster = (calculatedrosterId) => {
    return fetch(`REACT_APP_API
/calculatedrosters/${calculatedrosterId}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("roster_token")}`
            }
        })
        .then(res => res.json())
}
export const getCalculatedRosterChar = (calculatedRosterId) => {
    return fetch(`REACT_APP_API
/calculatedrosterchoices?calculatedroster=${calculatedRosterId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
}
export const newCalculatedRosterChoices = (newRosterChoiceObj) => {
    return fetch(`REACT_APP_API
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
    return fetch(`REACT_APP_API
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
    return fetch(`REACT_APP_API
/calculatedrosterchoices/${post_body.id}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        },
        body: JSON.stringify(post_body)})
}
export const deleteCalculatedRoster = (calculatedRosterId) => {
    return fetch(`REACT_APP_API
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
    return fetch(`REACT_APP_API
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
    return fetch(`REACT_APP_API
/calculatedrosters/${post_body.id}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        },
        body: JSON.stringify(post_body)})
}


