import { useEffect, useState } from "react"
import { WarResultMap } from "./WarResultMap"
import { getUserWarStats } from "../managers/UserManager"
import { editCalculatedRoster } from "../managers/CalculatedRosterManager"

export const WarStats = ({ localUser, userWarStats, setUserWarStats }) => {
    useEffect(
        () => {
            getUserWarStats()
                .then((URost) => {
                    setUserWarStats(URost)
                })
        },
        [])
        const publishRoster = (public_status, id) => {
            const payload = {is_public: public_status,
                id: id}
                editCalculatedRoster(payload)
                //get all rosters again
                .then(getUserWarStats)
                //set state
                .then(URost => {
                    setUserWarStats(URost)
                }
                )
            }
    return <>
    
    { userWarStats ? <div className="savedroster--container">{userWarStats.map((stat) => <WarResultMap localUser={localUser} setUserWarStats={setUserWarStats} getUserWarStats={getUserWarStats} key={stat.id} stat={stat} publishRoster={publishRoster}/>)}</div>
    : ""
    
    }</>
}


