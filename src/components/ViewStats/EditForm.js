import React, { useEffect, useState } from 'react';
import { editCalculatedRosterChoices } from '../managers/CalculatedRosterManager';
import  './modal.css'

export const EditForm = ({ onSubmit, player, getPlayersAgain, closeModal }) => {
  let copy = { ...player }
  const [playerCopy, setPlayerCopy] = useState({
    kills: copy.kills,
    deaths: copy.deaths,
    assists: copy.assists,
    healing: copy.healing,
    damage: copy.damage,
    id: copy.id,
    group: copy.group

  })

//I should add a handle change name = value here to condense the jsx

  const handleUpdate = (event) => {
    event.preventDefault()
    let copy = { ...playerCopy }
    console.log(copy)
    editCalculatedRosterChoices(copy)
        .then(() => {
            getPlayersAgain(player.calculated_roster.id)
            
        })
        closeModal()
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
      <label>Group # {player.group}</label>
      <select defaultValue={player.group ? player.group : 0} name="number" onChange={(event) => {
        const copy = { ...playerCopy }
        copy.group = parseInt(event.target.value)
        setPlayerCopy(copy)
      }} > <option value={0}>group</option>
        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
          <option value={num}>{num}</option>
        ))}
      </select>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit" onClick={click => { handleUpdate(click) }}>
          Submit
        </button>
      </div>
    </form>
  );
}