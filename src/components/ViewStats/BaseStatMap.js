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
 
    return <div className="player__results"><div className="player__name">{player?.character?.character_name}</div>
    <div className="player__results">{player?.group}</div>
    <div className="damage">{player?.damage}
    </div>
       <div className="healing">{player?.healing}</div>
       <div className="kills">{player?.kills}</div> 
       <div className='assists'>{player?.assists}</div>
       <EditContainer player={player} getPlayersAgain={getPlayersAgain} setPlayerStats={setPlayerStats} />
       <button onClick={(click)=>{handleDelete(click)}}>delete</button>
</div>
 }