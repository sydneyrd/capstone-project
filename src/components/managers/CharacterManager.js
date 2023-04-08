
export const getAllCharacters = (setCharacters) => {
    return fetch(`REACT_APP_API
/characters`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        
        .then(res => res.json()).then((res) => {setCharacters(res)})
}

export const getSingleCharacter = (characterId, setCharacter) => {
    return fetch(`REACT_APP_API
/characters/${characterId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json()).then((res) => {setCharacter(res)})
}
export const getSingleReadOnlyCharacter = (characterId, setCharacter) => {
    return fetch(`REACT_APP_API
/characters/${characterId}?view=read_only`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json()).then((res) => {setCharacter(res)})
        
    //no set function included in this don't forget .then
}
export const saveNewCharacter = (newCharacterToAPI) => {
    return fetch(`REACT_APP_API
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
    return fetch(`REACT_APP_API
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
    return fetch(`REACT_APP_API
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
    return fetch(`REACT_APP_API
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
    return fetch(`REACT_APP_API
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
    return fetch(`REACT_APP_API
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
    return fetch(`REACT_APP_API
/characters?search_text=${search}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('roster_token')}`
      }
    }).then(res => res.json())
  }
  export const getUserCharactersBySearch = (search) => {
    return fetch(`REACT_APP_API
/characters?search_text=${search}&user=user`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('roster_token')}`
      }
    }).then(res => res.json())
  }


  export const getFilteredCharacters = (searchParams, setCharacters) => {
    return fetch(`REACT_APP_API
/characters?${searchParams}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('roster_token')}`
      }
    }).then(res => res.json()).then((res) => {setCharacters(res)})
  }
export const getCalculatedRostersByCharacter = (characterId, setCalculatedRosters) => {
    return fetch(`REACT_APP_API
/calculatedrosters?character=${characterId}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('roster_token')}`
        }
    }).then(res => res.json()).then((res) => {setCalculatedRosters(res)})
}