import "./rostergrid.css"
import React from "react";
import { getRosterCharacter } from "../APIManager";
import { useEffect, useState } from "react";
import { RosterDiv } from "./RosterDiv";
import { getAllCharacters, getCurrentRoster } from "../APIManager";
import { RosterDivForEdit } from "./RosterDivForEdit";
//get all the people in the roster render them in the list

export const RosterGrid = ({ newRosterPicks, rosterIDNUMBER, characters, setNewRosterPick }) => {
    const [editRosterCharacters, setEditCharacters] = useState([])
    useEffect(
        () => {
            getCurrentRoster(rosterIDNUMBER)

                .then((res) => {
                    setEditCharacters(res)
                })
                
        },
        []
    )

    // useEffect(
    //     () => {

    //     },
    //     [editRosterCharacters]
    // )



    return <>{editRosterCharacters.map((c) => <RosterDivForEdit rosterIDNUMBER={rosterIDNUMBER} setEditCharacters={setEditCharacters} characters={characters} newRosterPicks={editRosterCharacters}
        setNewRosterPick={setNewRosterPick} key={c.id} c={c} />)}
        {newRosterPicks.map((c) => <RosterDiv newRosterPicks={newRosterPicks} setNewRosterPick={setNewRosterPick} key={c.id} c={c} />)}

    </>
}

