import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCalculatedRosterChar, getCalculatedRoster } from "../APIManager.js"
import "./results.css"

import { BaseStatMap } from "./BaseStatMap"

export function BaseStatContainer() {
    const { calculatedRosterId } = useParams()
    const [players, setPlayers] = useState([])
    const [filteredPlayers, setFilteredPlayers] = useState([])
    const [currentCalcRoster, setCurrentCalcRoster] = useState({})
    
    const [playerStats, setPlayerStats] = useState({})

    


    useEffect(
        () => {
            getCalculatedRosterChar(calculatedRosterId)
                .then((res) => {
                    setPlayers(res)
                    setFilteredPlayers(res)
                })
                .then(() =>
                    getCalculatedRoster(calculatedRosterId)
                        .then((r) => {
                            setCurrentCalcRoster(r)
                        }))
        },
        []
    )

    const getPlayersAgain = (calculatedRosterId) => {
        getCalculatedRosterChar(calculatedRosterId)
            .then((res) => {
                setPlayers(res)
                setFilteredPlayers(res)
            })
    }

    return<>
        <Link to={`/resources/${calculatedRosterId}/view`}>Return to Results</Link>


<div className="labels"> <h4 className="player__results">group #</h4>
    <h4 className="damage">Damage
    </h4>
       <h4 className="healing">Healing</h4>
       <h4 className="kills">Kills</h4> 
       <h4 className='assists'>assists</h4></div>
       
        {filteredPlayers.map(player => <BaseStatMap getPlayersAgain={getPlayersAgain} key={`${player.id}`} player={player}/>)}</>
}