import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCalculatedRoster, getCalculatedRosterChar } from "../managers/CalculatedRosterManager"
import {getAllCharacters} from "../managers/CharacterManager"
import { getPublicCalculatedRosterChar } from "../managers/PublicManager"
import { PublicStatFilters } from "./PublicStatFilters"


import "./publicresults.css"
import { PublicResultsMap } from "./PublicResultsMap"
import { PublicGroup } from "./PublicGroup"

export const PublicViewStats = () => {
    const { calculatedRosterId } = useParams()
    const [players, setPlayers] = useState([])
    const [filteredPlayers, setFilteredPlayers] = useState([])
    const [currentCalcRoster, setCurrentCalcRoster] = useState({})
    const [group, setGroup] = useState(false)
    const [base, setBase] = useState(false)
    console.log(calculatedRosterId)
    useEffect(
        () => {
            getPublicCalculatedRosterChar(calculatedRosterId)
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
    const armyKDR = currentCalcRoster.total_kills / currentCalcRoster.total_deaths
    const splitArray = (arr, prop) =>
        arr.reduce((acc, item) => {
            const key = item[prop] || "null";
            acc[key] = acc[key] || [];
            acc[key].push(item);
            return acc;
        }, {});

    const playerCopy = [...players]
    const groups = splitArray(playerCopy, "group");
    function sortByGroup(click) {
        click.preventDefault()
        setGroup(true)
        setBase(false)
    }
    function sortByArmy(click) {
        click.preventDefault()
        setGroup(false)
        setBase(false)
    }
function setBaseStats(click){
click.preventDefault()
setBase(true)
}
    return <>
        <div className="results">
            <span> {currentCalcRoster.rosterName}</span>
            <span>Total Damage: {currentCalcRoster.total_damage}</span>
            <span>Total Healing: {currentCalcRoster.total_healing}</span>
            <span>Kill/Death Ratio: {armyKDR.toFixed(2)}</span>
            <span>Total Deaths: {currentCalcRoster.total_deaths}</span>
            <span>Total Kills: {currentCalcRoster.total_kills}</span>
        </div>
            <div className="filters">
        <PublicStatFilters currentCalcRoster={currentCalcRoster} setBase={setBase} setGroup={setGroup} players={players} sortByGroup={sortByGroup} setBaseStats={setBaseStats} sortByArmy={sortByArmy}filteredPlayers={filteredPlayers} setFilteredPlayers={setFilteredPlayers} /></div>
        <hr></hr>
        <div className="results--body">
        <div className="player__resultsmap"
        style={{flexDirection: !group && !base ? "column" : "row"}}>
            
            {!group && !base ? 
                <div className="labels">
                <span className="player__name">Player</span>
                <span className="group">Group</span>
                <span className="damage">Damage</span>
                <span className="healing">Healing</span>
                <span className="kills">Kills</span>
                <span className="Assists">Assist</span>
                <span className="kdr">KDR</span>
                <span className="links">Vod Link</span></div>
                :
                ""
                }
            {
                !group && !base ?
                    filteredPlayers.map((player) => <PublicResultsMap key={`result--${player.id}`} currentCalcRoster={currentCalcRoster} player={player} />)
                    : 
                    Object.values(groups).map((group) => {
                        return <PublicGroup key={`group--${group[0].group}`} currentCalcRoster={currentCalcRoster} group={group} />
                    })
                    
            }  
        </div></div>
    </>
}
