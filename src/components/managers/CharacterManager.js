
export const getAllCharacters = (setCharacters) => {
    return fetch(`http://127.0.0.1:8000/characters`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
        .then((charactersArr) => {
            setCharacters(charactersArr)
        })
}

export const getSingleCharacter = (characterId, setCharacter) => {
    return fetch(`http://127.0.0.1:8000/characters/${characterId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("roster_token")}`
        }
    })
        .then(res => res.json())
        .then((character) => {
            setCharacter(character)
        })
    //no set function included in this don't forget .then
}

export const saveNewCharacter = (newCharacterToAPI) => {
    return fetch(`http://127.0.0.1:8000/characters`, {
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
    return fetch(`http://127.0.0.1:8000/characters/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        },
        body: JSON.stringify(uCharacter)
    })

}

export const newLink = (link) => {
    return fetch(`http://127.0.0.1:8000/links`, {
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
    return fetch(`http://127.0.0.1:8000/links?character=${characterId}`, {
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
    return fetch(`http://127.0.0.1:8000/links/${id}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        }
    }
    )
}
export const deleteCharacter = (deleteCharacterId) => {
    return fetch(`http://127.0.0.1:8000/characters/${deleteCharacterId}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('roster_token')}`
        }
    }
    )
}
export const getCharactersBySearch = (search) => {
    return fetch(`http://127.0.0.1:8000/characters?search_text=${search}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('roster_token')}`
      }
    }).then(res => res.json())
  }
  
  export const getFilteredCharacters = (searchParams, setCharacters) => {
    return fetch(`http://127.0.0.1:8000/characters?${searchParams}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('roster_token')}`
      }
    }).then(res => res.json()).then((res) => {setCharacters(res)})
  }