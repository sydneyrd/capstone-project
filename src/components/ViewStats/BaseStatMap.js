import { EditButton } from "./EditButton"
import React from 'react';
import { EditContainer } from "./EditContainer";
import { useState } from "react";

export const BaseStatMap = ({ player}) => {
const [setPlayerStats, playerStats] = useState({})
 
 
    return <div className="player__results"><div className="player__name">{player?.character?.character_name}</div>
    <div className="player__results">{player?.group}</div>
    <div className="damage">{player?.damage}
    </div>
       <div className="healing">{player?.healing}</div>
       <div className="kills">{player?.kills}</div> 
       <div className='kdr'>{player?.assists}</div>
       <EditContainer player={player} setPlayerStats={setPlayerStats} playerStats={playerStats}/>
</div>
 }