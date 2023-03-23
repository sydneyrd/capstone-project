import "./rostergrid.css"
import React from "react";
import { getRosterCharacter, getCurrentRoster, newRosterChoice  } from "../managers/RosterManager";
import { useEffect, useState } from "react";
import { RosterDiv } from "./RosterDiv";
import { getAllCharacters} from "../managers/CharacterManager";
import { RosterDivForEdit } from "./RosterDivForEdit";
import "./rostergrid.css"


//get all the people in the roster render them in the list

export const RosterGrid = ({showText, setShowText, charId, setNewRosterPick, setCharId, handleMouseEnter, handleMouseLeave, setEditCharacters, editRosterCharacters, 
    newRosterPicks, rosterIDNUMBER, characters }) => {
    useEffect(
        () => {
            if (rosterIDNUMBER) {
            getCurrentRoster(rosterIDNUMBER)
                .then((res) => {
                    setEditCharacters(res)
                })}}
        ,
        []
    )
    const createNestedArray = (arr, size) => {
        return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
    };

    const nestedEditRosterCharacters = createNestedArray
    (editRosterCharacters, 5);
    const handleDragOver = (e) => {
        e.preventDefault();
      };
    const handleDrop = (e, groupIndex) => {
        e.preventDefault();
        const characterData = e.dataTransfer.getData('character');
        const character = JSON.parse(characterData);
      
        if (!editRosterCharacters.find((player) => player.id === character.id)) {
          if (editRosterCharacters.length < 50) {
            const new_choice = { roster: rosterIDNUMBER, character: character.id }

        newRosterChoice(new_choice)
            .then(() => { getCurrentRoster(rosterIDNUMBER).then((res) => { setEditCharacters(res) }) })
          } else {
            alert('Roster is full');
          }
        }
      };
      

    return (
        <>
            {nestedEditRosterCharacters.map((group, groupIndex) => (
                <div  onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, groupIndex)}
                key={groupIndex} className="grid__item">
                    <span className="roster__group">group {groupIndex + 1}</span>
                    {group.map((c) => (
                        <RosterDivForEdit
                        getCurrentRoster={getCurrentRoster} showText={showText} setShowText={setShowText} charId={charId} setCharId={setCharId} handleMouseEnter={handleMouseEnter} 
                         handleMouseLeave={handleMouseLeave} rosterIDNUMBER={rosterIDNUMBER} setEditCharacters={setEditCharacters} characters={characters} newRosterPicks={editRosterCharacters}
                            setNewRosterPick={setNewRosterPick}
                            key={c.id}
                            c={c}
                        />
                    ))}
                </div>
            ))}
        </>
    );



}   



{/* {newRosterPicks.map((c) => <RosterDiv showText={showText} setShowText={setShowText} charId={charId} setCharId={setCharId} handleMouseEnter={handleMouseEnter} 
    handleMouseLeave={handleMouseLeave} newRosterPicks={newRosterPicks} setNewRosterPick={setNewRosterPick} key={c.id} c={c} />)} */}