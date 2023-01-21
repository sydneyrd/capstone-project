import { EditButton } from "./EditButton"
import React from 'react';
import { EditContainer } from "./EditContainer";
import { useState } from "react";

export const BaseStatMap = ({ setPlayerStats, player, setUpdate, update}) => {


 
 
    return <div className="player__results"><div className="player__name">{player?.character?.character_name}</div>
    <div className="player__results">{player?.group}</div>
    <div className="damage">{player?.damage}
    </div>
       <div className="healing">{player?.healing}</div>
       <div className="kills">{player?.kills}</div> 
       <div className='kdr'>{player?.assists}</div>
       <EditContainer player={player} setUpdate={setUpdate} update={update} setPlayerStats={setPlayerStats} />
</div>
 }