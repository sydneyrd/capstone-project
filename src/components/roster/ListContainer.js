import { CharacterList } from "./CharacterList"
import { DetailButton } from "./Details"
import { useState, useEffect } from "react"

export const ListContainer = ({ characters, servers, weapons, factions, roles }) => {
    const [showText, setShowText] = useState(false)
    const [charId, setId] = useState(0)
    
    const setCharId = e => {
        setId(parseInt(e.target.id))
    } //sets identifier to get correct detail info
    const handleMouseEnter = e => {
        e.target.style.background = "grey"
        setShowText(true)
    } //show pop up element when mouse
    const handleMouseLeave = e => {
        e.target.style.background = "maroon"
        setShowText(false)
        setId(0)
    }//removes the pop up and identifier when mouse leaves
    
    return <> <>
        <article>
            <ul className="character__list">{characters.map((character) =>
                <CharacterList key={`${character.id}`} servers={servers} weapons={weapons} factions={factions}
                    roles={roles} showText={showText} character={character}
                    handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}
                    setCharId={setCharId} />
            )}
            </ul></article></>

        <article> 
            {showText && charId > 0 ?
                <><DetailButton charId={charId} showText={showText} servers={servers} weapons={weapons} factions={factions} roles={roles} characters={characters} /> </>
                : <></>}
        </article></>
//only display the detail button if the charId has been set to something other than 0 and showText is true
}

