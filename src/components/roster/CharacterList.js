import { useState } from 'react';
import { DetailButton } from './Details';
import { AddButton } from './AddButton';

import "./roster.css"
import { CharacterModal } from './popup/CharacterModal';

export const CharacterList = ({editRosterCharacters, nestedEditRosterCharacters, rosterIDNUMBER, newRosterPicks, setNewRosterPick, charId, setEditCharacters, setCharId, character, servers, weapons, factions, roles, showText, handleMouseEnter, handleMouseLeave }) => {
  
  const handleDragStart = (e, character) => {
    e.dataTransfer.setData('character', JSON.stringify(character));
  };
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <div
    draggable="true"
    onDragStart={(e) => handleDragStart(e, character)}
    className="character__card"
id={character.id} onMouseOver={setCharId}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} >
      <span onClick={toggleModal}> {/* Add onClick event handler to the character's name element */}
        {character.character_name}
      </span>
      <AddButton className="add__button"
      nestedEditRosterCharacters={nestedEditRosterCharacters} 
      rosterIDNUMBER={rosterIDNUMBER} setEditCharacters={setEditCharacters} editRosterCharacters={editRosterCharacters} setNewRosterPick={setNewRosterPick} newRosterPicks={newRosterPicks} character={character}  id={character.id}  charId={charId} />


{modalVisible && ( // Conditionally render the modal based on the state
        <CharacterModal character={character} onClose={toggleModal} />
      )}
</div>
  )
}


