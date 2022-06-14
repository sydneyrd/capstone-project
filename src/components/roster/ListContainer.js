import { CharacterList } from "./CharacterList"
import { DetailButton } from "./Details"
import { useState, useEffect } from "react"

export const ListContainer = ({ characters, servers, weapons, factions, roles }) => {
    const [showText, setShowText] = useState(false)
    const [charId, setId] = useState(0)
    const setCharId = e => {
        setId(parseInt(e.target.id))
    }



    const handleMouseEnter = e => {
        e.target.style.background = "grey"
        setShowText(true)
        
    }

    const handleMouseLeave = e => {
        e.target.style.background = "maroon"
        setShowText(false)
        
    }

    return <> <>
        <article>
            <ul className="character__list">{characters.map((character) =>
                <CharacterList key={`${character.id}`} servers={servers} weapons={weapons} factions={factions}
                    roles={roles} showText={showText} character={character}
                    handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} 
                    setCharId={setCharId}/>
            )}
            </ul></article></>

        <article>
            {showText   && charId > 0 ?
                <><DetailButton charId={charId} showText={showText} servers={servers} weapons={weapons} factions={factions} roles={roles} characters={characters} /> </>
                : <></>}
        </article></>

}

