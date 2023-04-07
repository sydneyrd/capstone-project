export const getPublicCalculatedRosters = (setRosters) => {
    return fetch(`http://127.0.0.1:8000/public-rosters`, {
        method: "GET",
    })
        .then(res => res.json())
        .then((res) => {setRosters(res)})
}
export const getPublicCalculatedRoster = (calculatedRosterId, setRosters) => {
    return fetch(`http://127.0.0.1:8000/public-rosters/${calculatedRosterId}`, {
        method: "GET",
    })
        .then(res => res.json())
}



export const getPublicCalculatedRosterChar = (calculatedRosterId, setRosters) => {
    return fetch(`http://127.0.0.1:8000/public-roster-choices?calculatedroster=${calculatedRosterId}`, {
    })
        .then(res => res.json())
}

export const getPublicServers = (setServers) => {
    return fetch(`http://127.0.0.1:8000/public/servers`, {
        method: "GET",
    })
        .then(res => res.json())
        .then((res) => {setServers(res)})
}

export const getPublicWeapons = (setWeapons) => {
    return fetch(`http://127.0.0.1:8000/public/weapons`, {
        method: "GET",
    })
        .then(res => res.json())
        .then((res) => {setWeapons(res)})
}
export const getPublicRoles = (setRoles) => {
    return fetch(`http://127.0.0.1:8000/public/roles`, {
        method: "GET",
    })
        .then(res => res.json())
        .then((res) => {setRoles(res)})
}
export const getPublicFactions = (setFactions) => {
    return fetch(`http://127.0.0.1:8000/public/factions`, {
        method: "GET",
    })
        .then(res => res.json())
        .then((res) => {setFactions(res)})
}
export const addSharedCharacter = (newCharacter, token) => {
    return fetch(`http://127.0.0.1:8000/shared_character_create/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCharacter)
})
    .then(res => res.json())
}
// export async function fetchCsrfToken() {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/get-csrf-token/");
//       const data = await response.json();
//       return data.csrf_token;
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }
  