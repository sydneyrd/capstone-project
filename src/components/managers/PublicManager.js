export const getPublicCalculatedRosters = (setRosters) => {
    return fetch(`http://127.0.0.1:8000/public-rosters`, {
        method: "GET",
    })
        .then(res => res.json())
        .then((res) => {setRosters(res)})
}