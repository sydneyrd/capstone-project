import React from 'react';
import { editCalculatedRosterChoices } from '../APIManager';
// import  './modal.css'

export const EditForm = ({ onSubmit, player, setPlayerStats, playerStats, setUpdate, update }) => {

const handleUpdate = (event) => {
    event.preventDefault()
    let copy = { ...playerStats }
    editCalculatedRosterChoices(copy)
        .then(() => {
            let copy = !update
            setUpdate(copy)
        })
}

  return (
    <form onSubmit={onSubmit}>
<input onChange={(event) => {
            const copy = { ...playerStats }
            copy.kills = parseInt(event.target.value)
            setPlayerStats(copy)
          }} className="form-controlstat"
            placeholder="kills"
            type="number">
          </input>
<input className="form-controlstat"
            placeholder="deaths"
            type="number" onChange={(event) => {
              const copy = { ...player }
              copy.deaths = parseInt(event.target.value)
              setPlayerStats(copy)
            }}></input>  <input className="form-controlstat"
              placeholder="assists"
              type="number" onChange={(event) => {
                const copy = { ...playerStats }
                copy.assists = parseInt(event.target.value)
                setPlayerStats(copy)
              }}></input>
  <input className="form-controlstat"
            placeholder="healing"
            type="number" onChange={(event) => {
              const copy = { ...playerStats }
              copy.healing = parseInt(event.target.value)
              setPlayerStats(copy)
            }}></input>
  <input className="form-controlstat"
            placeholder="damage"
            type="number" onChange={(event) => {
              const copy = { ...playerStats }
              copy.damage = parseInt(event.target.value)
            setPlayerStats(copy)
          }}></input>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}