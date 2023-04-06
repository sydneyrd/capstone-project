import { EditButton } from "./EditButton"
import React from 'react';
import { EditContainer } from "./EditContainer";
import { useState } from "react";
import { useEffect } from "react";
import { deleteCalculatedRosterChoice } from "../managers/CalculatedRosterManager";

export const BaseStatMap = ({ setPlayerStats, calculatedRosterId, getPlayersAgain, player}) => {


 function handleDelete(click){
    click.preventDefault()
    deleteCalculatedRosterChoice(player.id)
    .then(()=>{getPlayersAgain(calculatedRosterId)})
    
 }
 
    return <div className="player__results"><span className="player__name">{player?.character?.character_name}</span>
    <span className="player__results">{player?.group}</span>
    <span className="damage">{player?.damage}
    </span>
       <span className="healing">{player?.healing}</span>
       <span className="deaths">{player?.deaths}</span>
       <span className="kills">{player?.kills}</span> 
       <span className='assists'>{player?.assists}</span><span className="buttons--span--edit">
       <EditContainer calculatedRosterId={calculatedRosterId} player={player} getPlayersAgain={getPlayersAgain} setPlayerStats={setPlayerStats} />
       <button className="delete--player--button"onClick={(click)=>{handleDelete(click)}}>Delete</button></span>
</div>
 }