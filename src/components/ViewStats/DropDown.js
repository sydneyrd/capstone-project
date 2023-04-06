import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getAllCharacters, getCharactersBySearch } from '../managers/CharacterManager';
import { debounce } from 'lodash';
import './modal.css';

function DropDownSelect({ calculatedRosterId, selectedPlayer, setSelectedPlayer }) {
  const [isOpen, setIsOpen] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchInputRef = useRef();

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!searchText) {
      getAllCharacters(setCharacters);
    }
  }, [searchText]);
  
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [characters]);
  
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

  const selectCharacter = (event, character) => {
    event.preventDefault();
    setSelectedPlayer(character);
    setIsOpen(false);
  };
  
  const handleOptionClick = (event, option) => {
    selectCharacter(event, option);
  };
  
  const handleKeyDown = useCallback((event) => {
    if (event.target === searchInputRef.current) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex((prevIndex) => {
          const newIndex = Math.min(prevIndex + 1, characters.length - 1);
          return newIndex;
        });
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex((prevIndex) => {
          const newIndex = Math.max(prevIndex - 1, 0);
          return newIndex;
        });
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (highlightedIndex > -1) {
          handleOptionClick(event, characters[highlightedIndex])
        }
      }
    }
  }, [characters, highlightedIndex]);
  
  
  
  

  const handleSearchChange = useCallback(
    debounce((searchText) => {
      getCharactersBySearch(searchText).then((data) => setCharacters(data));
    }, 300),
    []
  );

  const handleInputChange = (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
    handleSearchChange.cancel(); // Cancel any previous debounce timers
    handleSearchChange(newSearchText);
  };
  

  return (
    <div key="dropdownselect" className="dropdown-select">
      <div className="dropdown-select__input" onClick={handleInputClick}>
        {selectedPlayer?.character_name || 'Select an option...'}
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
                character.id === selectedPlayer.id ? 'selected' : ''
              } ${highlightedIndex === index ? 'highlighted' : ''}`}
              onClick={(event) => handleOptionClick(event, character)}
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
