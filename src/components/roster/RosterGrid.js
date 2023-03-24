import "./rostergrid.css"
import React from "react";
import { getRosterCharacter, getCurrentRoster, newRosterChoice } from "../managers/RosterManager";
import { useEffect, useState } from "react";
import { getAllCharacters } from "../managers/CharacterManager";
import { RosterDivForEdit } from "./RosterDivForEdit";
import "./rostergrid.css"


//get all the people in the roster render them in the list

export const RosterGrid = ({ showText, nestedEditRosterCharacters, setShowText, charId, setNewRosterPick, setCharId, handleMouseEnter, handleMouseLeave, setEditCharacters, editRosterCharacters,
    newRosterPicks, rosterIDNUMBER, characters }) => {

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

    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleDrop = (e, groupIndex) => {
        e.preventDefault();
        console.log(groupIndex);
        const characterData = e.dataTransfer.getData("character");
        const character = JSON.parse(characterData);
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
