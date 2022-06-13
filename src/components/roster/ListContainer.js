import { CharacterList } from "./CharacterList"
import { DetailButton } from "./Details"
import { useState, useEffect } from "react"

export const ListContainer = ({ setCharacter, resetChar, selectCharacter, setShowText, showText,  characters, servers, weapons, factions, roles }) => {
    
  
    



    const handleMouseEnter = e => {
        e.target.style.background = "grey"

        setShowText(true)
        
    }





    const handleMouseLeave = e => {
        e.target.style.background = "maroon"
        setShowText(false)
    }

   // let rC = { ...selectCharacter }

    return <>
        <article>
            <ul className="character__list">{characters.map((character) =>
                <CharacterList setCharacter={setCharacter} key={`${character.id}`}  character={character} name={character.character} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
            )}
            </ul></article>

        <article>
            {showText ?
                <> <DetailButton resetChar={resetChar} showText={showText} character={selectCharacter} servers={servers} weapons={weapons} factions={factions} roles={roles} /> </>
                : <></>}
        </article></>


}

