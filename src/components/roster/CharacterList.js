import { useState } from 'react';
import { DetailButton } from './Details';
import { AddButton } from './AddButton';
import "./roster.css"

export const CharacterList = ({editRosterCharacters, rosterIDNUMBER, newRosterPicks, setNewRosterPick, charId, setEditCharacters, setCharId, character, servers, weapons, factions, roles, showText, handleMouseEnter, handleMouseLeave }) => {
  

  return (
    <div className="character__card"
    
id={character.id} onMouseOver={setCharId}

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} >
      {character.character_name}
      <AddButton className="add__button"
      rosterIDNUMBER={rosterIDNUMBER} setEditCharacters={setEditCharacters} editRosterCharacters={editRosterCharacters} setNewRosterPick={setNewRosterPick} newRosterPicks={newRosterPicks} character={character}  id={character.id}  charId={charId} />
 </div>
  )
}


