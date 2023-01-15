import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCalculatedRosterChar, getCalculatedRoster } from "../APIManager.js"


import { BaseStatMap } from "./BaseStatMap"

export function BaseStatContainer() {
    const { calculatedRosterId } = useParams()
    const [players, setPlayers] = useState([])
    const [filteredPlayers, setFilteredPlayers] = useState([])
    const [currentCalcRoster, setCurrentCalcRoster] = useState({})

    


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

    return<>
        <Link to={`/resources/${calculatedRosterId}/view`}>Return to Results</Link>

        <div className="kdr">KDR</div>HELLO I AM THE NEW MODULE FOR EDITING DELETING AND VIEWING BASE PLAYER STATS
        {filteredPlayers.map(player => <BaseStatMap key={`${player.id}`} player={player}/>)}</>
}