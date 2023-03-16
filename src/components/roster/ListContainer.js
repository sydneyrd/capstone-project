import { CharacterList } from "./CharacterList"
import { DetailButton } from "./Details"
import { useState, useEffect } from "react"
import { SearchFilter } from "./SearchFilter"

export const ListContainer = ({ editRosterCharacters, setSearchTerms, showText, setShowText, charId, setNewRosterPick, setCharId, handleMouseEnter, handleMouseLeave, newRosterPicks, characters, servers, rosterIDNUMBER, weapons, factions, roles, setEditCharacters}) => {
  
  
    return <> <>
    
         <section className="character__list--roster">
            <div className="search--bar--wrapper">
            <SearchFilter setSearchTerms={setSearchTerms} /></div>
            {characters.map((character) =>
                <CharacterList rosterIDNUMBER={rosterIDNUMBER}
                 setEditCharacters={setEditCharacters}
                editRosterCharacters={editRosterCharacters} key={`characters--${character.id}`} servers={servers} weapons={weapons} factions={factions}
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

