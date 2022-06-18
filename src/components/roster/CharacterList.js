import { useState } from 'react';
import { DetailButton } from './Details';
import { AddButton } from './AddButton';

export const CharacterList = ({ newRosterPicks, setNewRosterPick, charId, setCharId, character, servers, weapons, factions, roles, showText, handleMouseEnter, handleMouseLeave }) => {
  

  return (
    <div className="character__card"
    
id={character.id} onMouseOver={setCharId}

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} >
      {character.character}
      < button className="detail__button"  >Details</button >
      <AddButton setNewRosterPick={setNewRosterPick} newRosterPicks={newRosterPicks} character={character}  id={character.id}  charId={charId} />
 </div>
  )
}


