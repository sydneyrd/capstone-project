import { useState } from 'react';
import { DetailButton } from './Details';

export const CharacterList = ({ setCharId, character, servers, weapons, factions, roles, showText, handleMouseEnter, handleMouseLeave }) => {
 

  return (
    <li className="character__card"

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} >
      {character.character}
      < button className="detail__button" id={character.id} onMouseOver={setCharId} >Details</button >
 </li>
  )
}
