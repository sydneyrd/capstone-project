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
    return <div>"hi hello i'm here i'm public boards container 
        i want to display a list of all of the public war stats, a link to the about page, and a link to login or register"
        {warStats.map((stat) => {
            return <div key={stat.id}>
                <div className="public--rosters"><Link to={`/public/${stat.id}`}>{
                    stat.rosterName ? `${stat.rosterName}` : "Untitled War Stats"
                }</Link>
            </div></div>
        })}
    </div>
}