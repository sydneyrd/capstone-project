import { useEffect, useState } from "react"
import { WarResultMap } from "./WarResultMap"

import { getUserWarStats } from "../APIManager"

export const WarStats = ({ localUser }) => {
    const [userWarStats, setUserWarStats] = useState([])
    const [rendCount, setCount] = useState(0)
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
        [rendCount]
    )

    return <>
    
    { userWarStats ? <><div className="savedroster--container">{userWarStats.map((stat) => <WarResultMap  key={stat.id} stat={stat} />)}</div></>
    : ""
    
    }</>
}


