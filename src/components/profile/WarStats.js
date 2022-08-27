import { useEffect, useState } from "react"
import { WarResultMap } from "./WarResultMap"
import { getUserWarStats } from "../APIManager"

export const WarStats = ({ localUser }) => {
    const [userWarStats, setUserWarStats] = useState([])
    useEffect(
        () => {
            getUserWarStats(localUser)
                .then((URost) => {
                    setUserWarStats(URost)
                })
        },
        [localUser]
    )
    useEffect(
        () => {
            getUserWarStats(localUser)
                .then((URost) => {
                    setUserWarStats(URost)
                })
        },
        []
    )

    return <>
    
    { userWarStats ? <><div className="savedroster--container">{userWarStats.map((stat) => <WarResultMap localUser={localUser} setUserWarStats={setUserWarStats} getUserWarStats={getUserWarStats} key={stat.id} stat={stat} />)}</div></>
    : ""
    
    }</>
}


