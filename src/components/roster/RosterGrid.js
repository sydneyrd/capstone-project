import "./rostergrid.css"
import React from "react";
import { getRosterCharacter, getCurrentRoster  } from "../managers/RosterManager";
import { useEffect, useState } from "react";
import { RosterDiv } from "./RosterDiv";
import { getAllCharacters} from "../managers/CharacterManager";
import { RosterDivForEdit } from "./RosterDivForEdit";


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

    // return <>{nestedEditRosterCharacters.map((c) => <RosterDivForEdit getCurrentRoster={getCurrentRoster} showText={showText} setShowText={setShowText} charId={charId} setCharId={setCharId} handleMouseEnter={handleMouseEnter} 
    // handleMouseLeave={handleMouseLeave} rosterIDNUMBER={rosterIDNUMBER} setEditCharacters={setEditCharacters} characters={characters} newRosterPicks={editRosterCharacters}
    //     setNewRosterPick={setNewRosterPick} key={c.id} c={c} />)}
    

    // </>

    return (
        <>
            {nestedEditRosterCharacters.map((group, groupIndex) => (
                <div key={groupIndex} className="grid__item">
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