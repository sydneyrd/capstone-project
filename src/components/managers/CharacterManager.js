const apiKey = process.env.REACT_APP_API;
export const getAllCharacters = (setCharacters) => {
    return fetch(`${apiKey}
/characters`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        
        .then(res => res.json()).then((res) => {setCharacters(res)})
}

export const getSingleCharacter = (characterId, setCharacter) => {
    return fetch(`${apiKey}
/characters/${characterId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json()).then((res) => {setCharacter(res)})
}
export const getSingleReadOnlyCharacter = (characterId, setCharacter) => {
    return fetch(`${apiKey}
/characters/${characterId}?view=read_only`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json()).then((res) => {setCharacter(res)})
        
    //no set function included in this don't forget .then
}
export const saveNewCharacter = (newCharacterToAPI) => {
    return fetch(`${apiKey}
/characters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        },
        body: JSON.stringify(newCharacterToAPI)
    })
        .then(res => res.json())
}

export const putCharacter = (uCharacter, id) => {
    return fetch(`${apiKey}
/characters/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        },
        body: JSON.stringify(uCharacter)
    })

}

export const newLink = (link) => {
    return fetch(`${apiKey}
/links`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        },
        body: JSON.stringify(link)
    })
        .then(res => res.json())
}
export const getCharacterLinks = (characterId, setCharacterLinks) => {
    return fetch(`${apiKey}
/links?character=${characterId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
        .then((links) => {
            setCharacterLinks(links)
        })
    //no set function included in this don't forget .then
}
export const deleteCharLink = (id) => {
    return fetch(`${apiKey}
/links/${id}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        }
    }
    )
}
export const deleteCharacter = (deleteCharacterId) => {
    return fetch(`${apiKey}
/characters/${deleteCharacterId}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        }
    }
    )
}

export const getCharactersBySearch = (search) => {
    return fetch(`${apiKey}
/characters?search_text=${search}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('roster_token')}`
      }
    }).then(res => res.json())
  }
  export const getUserCharactersBySearch = (search) => {
    return fetch(`${apiKey}
/characters?search_text=${search}&user=user`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('roster_token')}`
      }
    }).then(res => res.json())
  }


  export const getFilteredCharacters = (searchParams, setCharacters) => {
    return fetch(`${apiKey}
/characters?${searchParams}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('roster_token')}`
      }
    }).then(res => res.json()).then((res) => {setCharacters(res)})
  }
export const getCalculatedRostersByCharacter = (characterId, setCalculatedRosters) => {
    return fetch(`${apiKey}
/calculatedrosters?character=${characterId}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('roster_token')}`
        }
    }).then(res => res.json()).then((res) => {setCalculatedRosters(res)})
}