import React, { useEffect, useState } from 'react';
import { editCalculatedRosterChoices } from '../APIManager';
// import  './modal.css'

export const EditForm = ({ onSubmit, player, setPlayerStats, playerStats, setUpdate, update }) => {
 let copy = {...player}
 console.log(copy)
 const [playerCopy, setPlayerCopy] = useState({
      kills: copy.kills,
      deaths: copy.deaths,
      assists: copy.assists,
      healing: copy.healing,
      damage: copy.damage

 })

 console.log(playerCopy)

const handleUpdate = (event) => {
    event.preventDefault()
    let copy = { ...playerStats }
    editCalculatedRosterChoices(copy)
        .then(() => {
            let copy = !update
            setUpdate(copy)
        })
}
const changeValue = (event) => {

}

  return (
    <form onSubmit={onSubmit}>
      <label>Kills {player?.kills}</label>
<input onChange={(event) => {
            const copy = { ...playerCopy }
            copy.kills = parseInt(event.target.value)
            setPlayerCopy(copy)
          }} 
          defaultValue={player?.kills}
          className="form-controlstat"
            placeholder="kills"
            type="number">
          </input>
          <label>Deaths {player.deaths}</label>
<input className="form-controlstat"
            placeholder="deaths"
            defaultValue={player.deaths}
            type="number" onChange={(event) => {
              const copy = { ...playerCopy }
              copy.deaths = parseInt(event.target.value)
              setPlayerCopy(copy)
            }}></input> 
            <label>Assists {player.assists}</label>
             <input className="form-controlstat"
             defaultValue={player.assists}
              placeholder="assists"
              type="number" onChange={(event) => {
                const copy = { ...playerCopy }
                copy.assists = parseInt(event.target.value)
                setPlayerCopy(copy)
              }}></input>
              <label>Healing {player.healing}</label>
  <input className="form-controlstat"
            placeholder="healing"
            defaultValue={player.healing}
            type="number" onChange={(event) => {
              const copy = { ...playerCopy }
              copy.healing = parseInt(event.target.value)
              setPlayerCopy(copy)
            }}></input>
            <label>Damage {player.damage}</label>
  <input className="form-controlstat"
            placeholder="damage"
            defaultValue={player.damage}
            type="number" onChange={(event) => {
              const copy = { ...playerCopy }
              copy.damage = parseInt(event.target.value)
            setPlayerCopy(copy)
          }}></input>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}