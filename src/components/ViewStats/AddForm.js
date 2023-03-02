import React, { useEffect, useState } from 'react';
import { newCalculatedRosterChoices, getAllCharacters } from '../managers/CalculatedRosterManager';
import DropDownSelect from './DropDown';

import './modal.css'


export const AddForm = ({ calculatedRosterId, players, getPlayersAgain, onSubmit, closeModal }) => {
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const [player, setPlayer] = useState({
    calculated_roster: parseInt(calculatedRosterId),
    character: selectedPlayer.id,
    kills: 0,
    deaths: 0,
    assists: 0,
    healing: 0,
    damage: 0,
    group: 0
  })
  console.log(players)
useEffect(() => {
  
  let copy = {...player}
copy['character'] = selectedPlayer.id
setPlayer(copy)},
[selectedPlayer])

  const handleAdd = (event) => {
    event.preventDefault()
    if (players.find(p => p?.character?.id === selectedPlayer.id)) {
      alert('player already in roster')
    }
    else {newCalculatedRosterChoices(player)
      .then(() => {
        getPlayersAgain(calculatedRosterId) //after add update the base container map
      })
    closeModal()}
    
  }
  function handleChange(event) {
    const copy = { ...player }
    copy[event.target.name] = parseInt(event.target.value)
    setPlayer(copy)
  }

  
  return (



    <form onSubmit={onSubmit}>

      <DropDownSelect selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer} />
      <label>Kills</label>
      <input name="kills" onChange={(event) => {
        handleChange(event)
      }}
        defaultValue={0}
        className="form-controlstat"
        placeholder="kills"
        type="number">
      </input>
      <label>Deaths</label>
      <input name="deaths" className="form-controlstat"
        placeholder="deaths"
        defaultValue={0}
        type="number" onChange={(event) => {
          handleChange(event)
        }}></input>
      <label>Assists</label>
      <input className="form-controlstat"
        name="assists"
        defaultValue={0}
        placeholder="assists"
        type="number" onChange={(event) => {
          handleChange(event)
        }}></input>
      <label>Healing</label>
      <input className="form-controlstat"
        placeholder="healing"
        defaultValue={0}
        name="healing"
        type="number" onChange={(event) => {
          handleChange(event)
        }}></input>
      <label>Damage</label>
      <input className="form-controlstat"
        placeholder="damage"
        name="damage"
        defaultValue={0}
        type="number" onChange={(event) => {
          handleChange(event)
        }}></input>
      <label>Group #</label>
        <select onChange={(event) => {
          handleChange(event)
        }} name="group">
          <option value={0}>group</option>
  {Array.from({length: 10}, (_, i) => i + 1).map(num => (
    <option value={num}>{num}</option>
  ))}
</select>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit" onClick={click => { handleAdd(click) }}>
          Submit
        </button>
      </div>
    </form>
  );
}