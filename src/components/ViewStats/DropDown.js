import React, { useState, useRef } from 'react';
import {getAllCharacters, getCharactersBySearch} from '../managers/CharacterManager';
import { debounce } from 'lodash';
import { useEffect } from 'react';
import "./modal.css";

function DropDownSelect({calculatedRosterId, selectedPlayer, setSelectedPlayer}) {
  const [isOpen, setIsOpen] = useState(false);
const [characters, setCharacters] = useState([]);
const [searchText, setSearchText] = useState('');
//   const [filteredOptions, setFilteredOptions] = useState(options);
  const searchInputRef = useRef();

  const handleInputClick = () => {
    setIsOpen(!isOpen);
    // searchInputRef.current.focus();
  };
  useEffect(() => {
    searchText ?
    getAllCharacters(setCharacters)
    //   .then((response) => response.json())
    //   .then((data) => setCharacters(data));
    : handleSearchChange(searchText)
  }, [searchText]);
//   const handleInputChange = (event) => {
//     const inputValue = event.target.value.toLowerCase();
//     const filteredOptions = options.filter((option) =>
//       option.label.toLowerCase().includes(inputValue)
//     );
//     setSelectedOption(null);
//     setFilteredOptions(filteredOptions);
//   };

  const handleOptionClick = (option) => {
    setSelectedPlayer(option);
    setIsOpen(false);
  };


    const handleSearchChange = debounce((searchText) => {
    getCharactersBySearch(searchText)
    //   .then((response) => response.json())
      .then((data) => setCharacters(data));
  }, 500);

  const handleInputChange = (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
    handleSearchChange(newSearchText);
  };


  return (
    <div className="dropdown-select">
      <div className="dropdown-select__input" onClick={handleInputClick}>
        {selectedPlayer?.character_name || 'Select an option...'}
      </div>
      {isOpen && (
        <div className="dropdown-select__dropdown">
          <input
            type="text"
            className="dropdown-select__search-input"
            placeholder="Search options..."
            ref={searchInputRef}
            onChange={handleInputChange}
          />
          {characters.map((character) => (
            <div
              key={character.id}
              className={`dropdown-select__option ${
                character.id === selectedPlayer.id ? 'selected' : ''
              }`}
              onClick={() => handleOptionClick(character)}
            >
              {character.character_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default DropDownSelect;