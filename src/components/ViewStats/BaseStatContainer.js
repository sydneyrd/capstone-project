import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCalculatedRosterChar, getCalculatedRoster, editCalculatedRoster } from "../managers/CalculatedRosterManager";
import { AddContainer } from "./AddContainer"
import "./results.css"
import "./edit.css"

import { BaseStatMap } from "./BaseStatMap"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
library.add(faRotateLeft)
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
        [calculatedRosterId]
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
    const handlePublish = (click) => {
        click.preventDefault();
        if (currentCalcRoster.is_public) {
          if (window.confirm("Are you sure you want to make this roster private?")) {
            publishRoster();
          }
        } else {
          if (window.confirm("Are you sure you want to make this roster public?")) {
            publishRoster();
          }
        }
      };
    const publishRoster = () => {
const payload = {is_public: !currentCalcRoster.is_public,
        id: currentCalcRoster.id}
        editCalculatedRoster(payload).then(() => {
            getCalculatedRoster(calculatedRosterId).then((r) => {
                setCurrentCalcRoster(r)
            })
        })
    }

    return <><div className='edit--container'>
        <Link className="return--link" to={`/resources/${calculatedRosterId}/view`}>
            
        <FontAwesomeIcon icon="fa-solid fa-rotate-left"  />
            Return to Results</Link>
<div className="player__resultsmap">
        <div className="buttons__container">
        
        <input className="roster__name" type="text" onChange={(event) => { changeName(event) }} placeholder={currentCalcRoster.rosterName ?
        currentCalcRoster.rosterName : "give me a cool name please :( "}></input><button className="edit--roster--name--button" onClick={(click)=>{saveName(click)}}>Update Name</button>
        <button className="public--button" onClick={(click) => handlePublish(click)}>{
            currentCalcRoster.is_public ? "Make Private" : "Make Public"
            }</button>
        
        <AddContainer getPlayersAgain={getPlayersAgain} players={players} calculatedRosterId={calculatedRosterId} />
        
        </div>


        
        <div className="labels"> <span></span>
        <span className="player__results">group #</span>
            <span className="damage">Damage
            </span>
            <span className="healing">Healing</span>
            <span className="deaths">Deaths</span>
            <span className="kills">Kills</span>
            <span className='assists'>assists</span>
            <span className="button--spacing"></span>
            </div>

        {filteredPlayers.map(player => <BaseStatMap calculatedRosterId={calculatedRosterId} getPlayersAgain={getPlayersAgain} key={`${player.id}`} player={player} />)}</div></div></>
}