import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllCharacters, getCalculatedRoster, getCalculatedRosterChar } from "../APIManager"
import { ResultsMap } from "./ResultsMap"
import { StatFilters } from "./StatFilters"
import { GroupContainer } from "./GroupContainer"
import "./results.css"

export const ViewStats = () => {
    const { calculatedRosterId } = useParams()
    const [players, setPlayers] = useState([])
    const [filteredPlayers, setFilteredPlayers] = useState([])
    const [currentCalcRoster, setCurrentCalcRoster] = useState({})
    const [group, setGroup] = useState(false)
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
    }
    function sortByArmy(click) {
        click.preventDefault()
        setGroup(false)
    }

    return <>
        <div className="results">
            <h2> {currentCalcRoster.name}</h2>
            <h2>Total Damage: {currentCalcRoster.total_damage}</h2>
            <h2>Total Healing: {currentCalcRoster.total_healing}</h2>
            <h2>Kill/Death Ratio: {armyKDR.toFixed(2)}</h2>
            <h2>Total Deaths: {currentCalcRoster.total_deaths}</h2>
            <h2>Total Kills: {currentCalcRoster.total_kills}</h2></div>
        <StatFilters setGroup={setGroup} players={players} sortByGroup={sortByGroup} sortByArmy={sortByArmy}filteredPlayers={filteredPlayers} setFilteredPlayers={setFilteredPlayers} />
        <div className="player__resultsmap">
            <div className="labels">
                <div className="player__name">Player</div>
                <div className="labels">Group</div>
                <div className="damage">Damage</div>
                <div className="healing">Healing</div>
                <div className="kills">Kills</div>
                <div className="Assists">Assist</div>
                <div className="kdr">KDR</div></div>
            {
                !group ?
                    filteredPlayers.map((player) => <ResultsMap key={`result--${player.id}`} currentCalcRoster={currentCalcRoster} player={player} />)
                    :
                    Object.values(groups).map((group) => {
                        return <GroupContainer key={`group--${group[0].group}`} currentCalcRoster={currentCalcRoster} group={group} />
                    })
            }
        </div>
    </>
}




