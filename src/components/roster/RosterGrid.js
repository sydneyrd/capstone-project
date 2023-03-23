import "./rostergrid.css"
import React from "react";
import { getRosterCharacter, getCurrentRoster, newRosterChoice  } from "../managers/RosterManager";
import { useEffect, useState } from "react";
import { RosterDiv } from "./RosterDiv";
import { getAllCharacters} from "../managers/CharacterManager";
import { RosterDivForEdit } from "./RosterDivForEdit";
import "./rostergrid.css"


//get all the people in the roster render them in the list

export const RosterGrid = ({showText, nestedEditRosterCharacters, setShowText, charId, setNewRosterPick, setCharId, handleMouseEnter, handleMouseLeave, setEditCharacters, editRosterCharacters, 
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

    const handleDragOver = (e) => {
        e.preventDefault();
      };
    const handleDrop = (e, groupIndex) => {
        e.preventDefault();
        console.log(groupIndex)
        const characterData = e.dataTransfer.getData('character');
        const character = JSON.parse(characterData);
      
        if (!editRosterCharacters.find((player) => player.id === character.id)) {
          if (editRosterCharacters.length < 50) {
            const new_choice = { roster: rosterIDNUMBER, character: character.id, group: groupIndex + 1}
            // I also need to add a group number to the new choice, I want to be able to use the group number displayed on screen so the user can see where the character is going

        newRosterChoice(new_choice) 
            .then(() => { getCurrentRoster(rosterIDNUMBER).then((res) => { setEditCharacters(res) }) })
          } else {
            alert('Roster is full');
          }
        }
      };
      const totalGroups = 10;
const emptyGroups = new Array(totalGroups).fill([]);
const allGroups = emptyGroups.map((emptyGroup, index) => {
    return nestedEditRosterCharacters[index] || emptyGroup;
  });
  


    return (
        <>
            {allGroups.map((group, groupIndex) => (
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