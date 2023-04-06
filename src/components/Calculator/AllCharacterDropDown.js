import React, { useState, useRef, useEffect } from 'react';
import { getAllCharacters, getCharactersBySearch } from '../managers/CharacterManager';
import { debounce } from 'lodash';

function DropDownSelect({ handleChangeAllCharacters, playerStats }) {
  const [isOpen, setIsOpen] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef();
  const [highlightedIndex, setHighlightedIndex] = useState(-1);


  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    !searchText
      ? getAllCharacters(setCharacters)
      : handleSearchChange(searchText);
  }, [searchText]);

  const handleClickOutside = (event) => {
    if (searchInputRef.current && !searchInputRef.current.parentNode.contains(event.target)) {
      setIsOpen(false);
    }
  };
  

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
     
      searchInputRef.current.focus();
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
     
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
     
    };
  }, [isOpen]);
  
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, characters.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (highlightedIndex > -1) {
        handleOptionClick(characters[highlightedIndex]);
      }
    }
  };
  
  
  const handleOptionClick = (option) => {
    handleChangeAllCharacters(option);
    setIsOpen(false);
  };

  const handleSearchChange = debounce((searchText) => {
    getCharactersBySearch(searchText).then((data) => setCharacters(data));
  });

  const handleInputChange = (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
    handleSearchChange(newSearchText);
  };

  let characterName = characters.find((c) => c.id === playerStats.character)?.character_name;

  return (
    <div key="dropdownselect" className="dropdown-select">
      <div className="dropdown-select__input" onClick={handleInputClick}>
        {characterName || 'Select an option...'}
      </div>
      {isOpen && (
        <div className="dropdown-select__dropdown">
          <input
          onKeyDown={handleKeyDown}
            type="text"
            className="dropdown-select__search-input"
            placeholder="Search options..."
            ref={searchInputRef}
            onChange={handleInputChange}
          />
          {characters.map((character, index) => (
  <div
    key={`player--select${character.id}`}
    className={`dropdown-select__option ${
      character.id === playerStats.character ? 'selected' : ''
    } ${highlightedIndex === index ? 'highlighted' : ''}`}
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
