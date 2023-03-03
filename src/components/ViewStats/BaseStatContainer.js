import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCalculatedRosterChar, getCalculatedRoster, editCalculatedRoster } from "../managers/CalculatedRosterManager";
import { AddContainer } from "./AddContainer"
import "./results.css"

import { BaseStatMap } from "./BaseStatMap"

export function BaseStatContainer() {
    const { calculatedRosterId } = useParams()
    const [players, setPlayers] = useState([])
    const [filteredPlayers, setFilteredPlayers] = useState([])
    const [currentCalcRoster, setCurrentCalcRoster] = useState({
        id: 0,
        rosterName: "",
        roster: {
            id: 0,
            name: "",
            user: 0
        },
        user: { id: 0, user: 0 },
        total_damage: 0,
        total_healing: 0,
        total_deaths: 0,
        total_kills: 0,
        total_assists: 0,

    })
    const [editRoster, setEditRoster] = useState({
        rosterName: "",
        id: 0,
        roster: 0
    })
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
    useEffect(() => {
        let editValues = {
            rosterName: currentCalcRoster.rosterName,
            id: currentCalcRoster.id,
            roster: currentCalcRoster?.roster?.id
        }
        setEditRoster(editValues)
    }, [currentCalcRoster])
    const getPlayersAgain = (calculatedRosterId) => {
        getCalculatedRosterChar(calculatedRosterId)
            .then((res) => {
                setPlayers(res)
                setFilteredPlayers(res)
            })
    }
    const changeName = (event) => {
        event.preventDefault()
        const copy = { ...editRoster }
        copy.rosterName = event.target.value
        setEditRoster(copy)
    }
    const saveName = (click) => {
    click.preventDefault()
        const copy = { ...editRoster }
        editCalculatedRoster(copy)
    }

    return <>
        <Link to={`/resources/${calculatedRosterId}/view`}>Return to Results</Link>
        <AddContainer getPlayersAgain={getPlayersAgain} players={players} calculatedRosterId={calculatedRosterId} />
        <input className="roster__name" type="text" onChange={(event) => { changeName(event) }} placeholder={currentCalcRoster.rosterName}></input><button onClick={(click)=>{saveName(click)}}>update name</button>


        <div className="labels"> <h4 className="player__results">group #</h4>
            <h4 className="damage">Damage
            </h4>
            <h4 className="healing">Healing</h4>
            <h4 className="deaths">Deaths</h4>
            <h4 className="kills">Kills</h4>
            <h4 className='assists'>assists</h4></div>

        {filteredPlayers.map(player => <BaseStatMap calculatedRosterId={calculatedRosterId} getPlayersAgain={getPlayersAgain} key={`${player.id}`} player={player} />)}</>
}