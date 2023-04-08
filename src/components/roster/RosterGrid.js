import "./rostergrid.css"
import React from "react";
import {  getCurrentRoster, newRosterChoice, newRoster } from "../managers/RosterManager";
import { editContext } from "../views/ApplicationViews"
import { useEffect, useContext } from "react";
import { RosterDivForEdit } from "./RosterDivForEdit";
import "./rostergrid.css"


//get all the people in the roster render them in the list

export const RosterGrid = ({ showText, nestedEditRosterCharacters, setShowText, charId, setNewRosterPick, setCharId, handleMouseEnter, handleMouseLeave, setEditCharacters, editRosterCharacters,
    newRosterPicks, rosterIDNUMBER, characters }) => {
        const { currentEditRoster, setCurrentEditRoster } = useContext(editContext);
    useEffect(
        () => {
            if (rosterIDNUMBER) {
                getCurrentRoster(rosterIDNUMBER)
                    .then((res) => {
                        setEditCharacters(res)
                    })
            }
        }
        ,
        []
    )
    useEffect(() => {
        if (rosterIDNUMBER > 0){
            getCurrentRoster(rosterIDNUMBER).then((res)=>{setEditCharacters(res)}
            )
        }

    }, [currentEditRoster])

    const addChoiceToEnd = (character, rosterId, nextGroup) => {
        const new_choice = { roster: rosterId, character: character.id, group: nextGroup}

        newRosterChoice(new_choice)
            .then(() => { getCurrentRoster(rosterId).then((res) => { setEditCharacters(res) }) })

    }

    const handleStartClick1 = async (character) => {
        newRoster().then((newRosterObj) => { 
            setCurrentEditRoster(newRosterObj.id);
            const nextGroup = findNextAvailableGroup(nestedEditRosterCharacters);
            addChoiceToEnd(character, newRosterObj.id, nextGroup);
            //adds the character to the database 
        });

        alert("Saving New Roster...")
    }

    const findNextAvailableGroup = (charactersArray) => {
        const groups = {};
      
        // Count the number of characters in each group
        charactersArray.forEach((character) => {
        if (!groups[character.group]) {
            groups[character.group] = 1;
        } else {
            groups[character.group]++;
        }
        });
        for (let i = 1; i <= 10; i++) {
          if (!groups[i] || groups[i] < 5) {
            return i;
          }
        }
        return -1; // All groups are full
      };

    const handleDragOver = (e) => {
        e.preventDefault();
    };
    
    const handleDrop = (e, groupIndex) => {
        e.preventDefault();
        const characterData = e.dataTransfer.getData("character");
        const character = JSON.parse(characterData);
        if (rosterIDNUMBER === 0) {handleStartClick1(character)}
    else{}
        if (!editRosterCharacters.find((player) => player.id === character.id)) {
        if (editRosterCharacters.length < 50) {
            // Check if the group is already full
            const groupSize = editRosterCharacters.filter((player) => player.group === groupIndex + 1).length;
            if (groupSize >= 5) {
            alert("This group is already full. Please choose another group.");
            return;
            }
            const new_choice = {
          roster: rosterIDNUMBER,
          character: character.id,
            group: groupIndex + 1,
            };
            newRosterChoice(new_choice).then(() => {
              getCurrentRoster(rosterIDNUMBER).then((res) => {
                setEditCharacters(res);
            });
            });
        } else {
            alert("Roster is full");
        }}};

    const totalGroups = 10;

    const allGroups = Array.from({ length: totalGroups }, (_, groupIndex) => {
      return editRosterCharacters.filter((c) => c.group === groupIndex + 1);
    });
   
    return (
        <>
            {allGroups.map((group, groupIndex) => (
                <div onDragOver={handleDragOver}
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
