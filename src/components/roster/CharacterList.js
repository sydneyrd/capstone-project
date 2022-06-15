import { useState } from 'react';
import { DetailButton } from './Details';
import { AddButton } from './AddButton';

export const CharacterList = ({  setNewRosterPick, charId, setCharId, character, servers, weapons, factions, roles, showText, handleMouseEnter, handleMouseLeave }) => {
  

  return (
    <div className="character__card"
    


      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} >
      {character.character}
      < button className="detail__button" id={character.id} onMouseOver={setCharId} >Details</button >
      <AddButton setNewRosterPick={setNewRosterPick}  character={character}  id={character.id}  charId={charId} />
 </div>
  )
}


