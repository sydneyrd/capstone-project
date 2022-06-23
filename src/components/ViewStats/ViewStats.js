import { useParams } from "react-router-dom"
 import { useEffect, useState } from "react"
import { getCalculatedRoster, getCalculatedRosterChar } from "../APIManager"
import {ResultsMap} from "./ResultsMap"

export const ViewStats = () => {

    const { calculatedRosterId } = useParams()
 const [players, setPlayers] = useState([])
const [currentCalcRoster, setCurrentCalcRoster] = useState({})

    useEffect(
        () => {
            getCalculatedRosterChar(calculatedRosterId)
                .then((res) => {
                    setPlayers(res)
                })
                .then(() => 
                getCalculatedRoster(calculatedRosterId)
                .then((r) => 
               {
                setCurrentCalcRoster(r)
               } ))
        },
        [] //i put rosterID in there because it keeps warning me about it one npm start so I thought i'd try it, prolly break things
    )

    let sumDamage = 0
    players.map(element => {
        sumDamage += element.damage
    })

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
    const totalDam = sumDamage
    const totalHealings = sumHealing
    const totalDyings = sumDeaths
    const totalKillings = sumKills
    const armyKDR = totalKillings / totalDyings   //why isn't this working here?

    return <>
        <div className="results">
            <h2> {currentCalcRoster.name}</h2>
            <h2>Total Damage: {totalDam}</h2>
            <h2>Total Healing: {totalHealings}</h2>
            <h2>Kill/Death Ratio: {armyKDR}</h2>
            <h2>Total Deaths: {totalDyings}</h2>
            <h2>Total Kills: {totalKillings}</h2></div>
      <div className="labels">  <div>Damage</div>
        <div>Healing</div>
        <div>Kills</div>
        <div>Assist</div>
        <div>KDR</div></div>
        <div className="player__resultsmap"> {players.map((player) => <ResultsMap totalHealings={totalHealings}
            totalDyings={totalDyings} totalDam={totalDam} totalKillings={totalKillings}
            key={player.id} player={player} />)}</div>
    </>
}




