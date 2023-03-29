import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCalculatedRoster, getCalculatedRosterChar } from "../managers/CalculatedRosterManager"
import {getAllCharacters} from "../managers/CharacterManager"
import { ResultsMap } from "./ResultsMap"
import { StatFilters } from "./StatFilters"
import { GroupContainer } from "./GroupContainer"
import { BaseStatContainer } from "./BaseStatContainer.js"
import "./results.css"

export const ViewStats = () => {
    const { calculatedRosterId } = useParams()
    const [players, setPlayers] = useState([])
    const [filteredPlayers, setFilteredPlayers] = useState([])
    const [currentCalcRoster, setCurrentCalcRoster] = useState({})
    const [group, setGroup] = useState(false)
    const [base, setBase] = useState(false)
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
            <Link className='button-84' to={`/resources/edit/${currentCalcRoster.id}`} > Edit </Link></div>
        <StatFilters currentCalcRoster={currentCalcRoster} setBase={setBase} setGroup={setGroup} players={players} sortByGroup={sortByGroup} setBaseStats={setBaseStats} sortByArmy={sortByArmy}filteredPlayers={filteredPlayers} setFilteredPlayers={setFilteredPlayers} />
        <div className="results--body">
        <div className="player__resultsmap">
            
            {!group && !base ? 
                <div className="labels">
                <span className="player__name">Player</span>
                <span className="group">Group</span>
                <span className="damage">Damage</span>
                <span className="healing">Healing</span>
                <span className="kills">Kills</span>
                <span className="Assists">Assist</span>
                <span className="kdr">KDR</span></div>
                :
                ""
                }
            {
                !group && !base ?
                    filteredPlayers.map((player) => <ResultsMap key={`result--${player.id}`} currentCalcRoster={currentCalcRoster} player={player} />)
                    :
                    Object.values(groups).map((group) => {
                        return <GroupContainer key={`group--${group[0].group}`} currentCalcRoster={currentCalcRoster} group={group} />
                    })
                    
            }  
        </div></div>
    </>
}




