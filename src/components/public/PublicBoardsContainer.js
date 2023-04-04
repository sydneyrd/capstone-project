import { useEffect, useState } from "react"
import { getPublicCalculatedRosters } from "../managers/PublicManager"
import { Link } from "react-router-dom"
export const PublicBoardsContainer = () => {
const [warStats, setWarStats] = useState([])

    useEffect(
        () => {
            getPublicCalculatedRosters(setWarStats)
        },
        []
    )

    //get all public warboards
    //display them


    return <div className="parent">
        <div className="war--stats--list--container">
            PUBLIC BOARDS
        {warStats.map((stat) => {
            return <div key={stat.id}>
                <div className="public--rosters"><Link to={`/public/${stat.id}`}>{
                    stat.rosterName ? `${stat.rosterName}` : "Untitled War Stats"
                }</Link>
            </div></div>
        })}</div>

        <div className="right--container">

            we could put a little banner for willy on the side :D
        </div>
    </div>
}