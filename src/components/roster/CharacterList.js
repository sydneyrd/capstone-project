import { useState } from 'react';
import { DetailButton } from './Details';
import { AddButton } from './AddButton';
import "./roster.css"

export const CharacterList = ({editRosterCharacters, nestedEditRosterCharacters, rosterIDNUMBER, newRosterPicks, setNewRosterPick, charId, setEditCharacters, setCharId, character, servers, weapons, factions, roles, showText, handleMouseEnter, handleMouseLeave }) => {
  
  const handleDragStart = (e, character) => {
    e.dataTransfer.setData('character', JSON.stringify(character));
  };

  return (
    <div
    draggable="true"
    onDragStart={(e) => handleDragStart(e, character)}
    className="character__card"
id={character.id} onMouseOver={setCharId}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} >
      {character.character_name}
      <AddButton className="add__button"
      nestedEditRosterCharacters={nestedEditRosterCharacters} 
      rosterIDNUMBER={rosterIDNUMBER} setEditCharacters={setEditCharacters} editRosterCharacters={editRosterCharacters} setNewRosterPick={setNewRosterPick} newRosterPicks={newRosterPicks} character={character}  id={character.id}  charId={charId} />
</div>
  )
}


