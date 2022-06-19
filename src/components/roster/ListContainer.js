import { CharacterList } from "./CharacterList"
import { DetailButton } from "./Details"
import { useState, useEffect } from "react"

export const ListContainer = ({ showText, setShowText, charId, setNewRosterPick, setCharId, handleMouseEnter, handleMouseLeave, newRosterPicks, characters, servers, weapons, factions, roles }) => {
  
  
    return <> <>
         <section className="character__list">{characters.map((character) =>
                <CharacterList key={`characters--${character.id}`} servers={servers} weapons={weapons} factions={factions}
                    roles={roles} showText={showText} character={character}
                    handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}
                    setCharId={setCharId} charId={charId}
                     setNewRosterPick={setNewRosterPick} newRosterPicks={newRosterPicks}
                   /> )}
            </section></>
<article className="details__element"> 
            {showText && charId > 0 ?
                <><DetailButton charId={charId} showText={showText} servers={servers} weapons={weapons} factions={factions} roles={roles} characters={characters} /> </>
                : <></>}
        </article></>
//only display the detail button if the charId has been set to something other than 0 and showText is true
}

