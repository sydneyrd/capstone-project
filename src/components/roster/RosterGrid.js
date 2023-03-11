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

    return <>{editRosterCharacters.map((c) => <RosterDivForEdit showText={showText} setShowText={setShowText} charId={charId} setCharId={setCharId} handleMouseEnter={handleMouseEnter} 
    handleMouseLeave={handleMouseLeave} rosterIDNUMBER={rosterIDNUMBER} setEditCharacters={setEditCharacters} characters={characters} newRosterPicks={editRosterCharacters}
        setNewRosterPick={setNewRosterPick} key={c.id} c={c} />)}
        {newRosterPicks.map((c) => <RosterDiv showText={showText} setShowText={setShowText} charId={charId} setCharId={setCharId} handleMouseEnter={handleMouseEnter} 
    handleMouseLeave={handleMouseLeave} newRosterPicks={newRosterPicks} setNewRosterPick={setNewRosterPick} key={c.id} c={c} />)}

    </>
}