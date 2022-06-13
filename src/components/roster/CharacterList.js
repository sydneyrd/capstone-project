import { useState } from 'react';
import { DetailButton } from './Details';

export const CharacterList = ({character, setCharacter, name, handleMouseEnter, handleMouseLeave }) => {
  return (
    <li className="character__card"
    onMouseOver={setCharacter(character)}
onMouseEnter = { handleMouseEnter  }
onMouseLeave = { handleMouseLeave } >
  { name }
  < button className = "add__button" > Add to Roster</button >
    </li >
  )}
