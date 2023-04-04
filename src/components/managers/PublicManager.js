export const getPublicCalculatedRosters = (setRosters) => {
    return fetch(`http://127.0.0.1:8000/public-rosters`, {
        method: "GET",
    })
        .then(res => res.json())
        .then((res) => {setRosters(res)})
}

export const getPublicCalculatedRosterChar = (calculatedRosterId, setRosters) => {
    return fetch(`http://127.0.0.1:8000/public-roster-choices?calculatedroster=${calculatedRosterId}`, {
    })
        .then(res => res.json())
        .then((res) => {setRosters(res)})
}