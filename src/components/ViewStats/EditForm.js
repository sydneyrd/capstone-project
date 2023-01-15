import React from 'react';

export const EditForm = ({ onSubmit, player, setPlayerStats, playerStats }) => {
  return (
    <form onSubmit={onSubmit}>
<input onChange={(event) => {
            const copy = { ...player }
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
                const copy = { ...player }
                copy.assists = parseInt(event.target.value)
                setPlayerStats(copy)
              }}></input>
  <input className="form-controlstat"
            placeholder="healing"
            type="number" onChange={(event) => {
              const copy = { ...player }
              copy.healing = parseInt(event.target.value)
              setPlayerStats(copy)
            }}></input>
  <input className="form-controlstat"
            placeholder="damage"
            type="number" onChange={(event) => {
              const copy = { ...player }
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
};
export default EditForm;






