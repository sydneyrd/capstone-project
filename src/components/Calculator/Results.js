import { useEffect, useState } from "react"
import { getCalculatedRosterChar } from "../APIManager"
import { ResultsMap } from "./ResultsMap"
import "./results.css" 

export const Results = ({ calculatedRosterId, currentCalcRostName, showResults }) => {
    const [players, setPlayers] = useState([])
    

    useEffect(
        () => {
            getCalculatedRosterChar(calculatedRosterId)
                .then((res) => {
                    setPlayers(res)
                })
        },
        [showResults]
    )

  let sumDamage = 0
 let whatisThis =  players.map(element => {
     sumDamage += element.damage
    }) 
    console.log(whatisThis)
let sumHealing = 0
players.map(element => {
    sumHealing += element.healing
})

let sumKills = 0 
players.map(element => {
    sumKills += element.kills
})

let sumDeaths = 0
players.map(element => {
    sumDeaths += element.deaths
})
// const totalDam = sumDamage
// const totalHealings = sumHealing
// const totalDyings = sumDeaths
// const totalKillings = sumKills


    return <>
         <div className="results"> 
            <h2> {currentCalcRostName}</h2>
            <h2>Total Damage: {sumDamage}</h2>
          <h2>Total Healing: {sumHealing}</h2>
        <h2>Kill/Death Ratio: </h2> 
        <h2>Total Deaths: {sumDeaths}</h2> 
           <h2> Total Kills: {sumKills}</h2></div>
            <div className="player__results"> {players.map((player) => <ResultsMap 
                 key={player.id} player={player} />)}</div>
    </>
}



