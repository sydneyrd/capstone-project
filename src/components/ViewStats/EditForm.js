import React, { useEffect, useState } from 'react';
import { editCalculatedRosterChoices } from '../managers/CalculatedRosterManager';
import  './modal.css'

export const EditForm = ({ onSubmit, player, calculatedRosterId, getPlayersAgain, closeModal }) => {
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

  function handleChange(event) {
    const copy = { ...playerCopy }
    copy[event.target.name] = parseInt(event.target.value)
    setPlayerCopy(copy)
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    let copy = { ...playerCopy }
    editCalculatedRosterChoices(copy)
        .then(() => {
            getPlayersAgain(calculatedRosterId)
            
        })
        closeModal()
}
console.log(calculatedRosterId)

  return (<>
    <span>{player?.character?.character_name}</span>
    <form onSubmit={onSubmit}>
      <label>Kills {player?.kills}</label>
      <input onChange={(event) => {
        handleChange(event)
      }}
        defaultValue={player?.kills}
        name="kills"
        className="form-controlstat"
        placeholder="kills"
        type="number">
      </input>
      <label>Deaths {player.deaths}</label>
      <input className="form-controlstat"
        placeholder="deaths"
        defaultValue={player.deaths}
        name="deaths"
        type="number" onChange={(event) => {
          handleChange(event)
        }}></input>
      <label>Assists {player.assists}</label>
      <input className="form-controlstat"
        defaultValue={player.assists}
        name="assists"
        placeholder="assists"
        type="number" onChange={(event) => {
          handleChange(event)
        }}></input>
      <label>Healing {player.healing}</label>
      <input className="form-controlstat"
        placeholder="healing"
        defaultValue={player.healing}
        name="healing"
        type="number" onChange={(event) => {
          handleChange(event)
        }}></input>
      <label>Damage {player.damage}</label>
      <input className="form-controlstat"
        placeholder="damage"
        name="damage"
        defaultValue={player.damage}
        type="number" onChange={(event) => {
          handleChange(event)
        }}></input>
      <label>Group # {player.group}</label>
      <select defaultValue={player.group ? player.group : 0} name="group" onChange={(event) => {
        handleChange(event)
      }} > <option value={0}>group</option>
        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit" onClick={click => { handleUpdate(click) }}>
          Submit
        </button>
      </div>
    </form></>
  );
}