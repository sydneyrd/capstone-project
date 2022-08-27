import { useEffect, useState } from "react"
import { getUserRosters } from "../APIManager"
import { SavedRosterList } from "./SavedRosterList"


export const SavedRosters = ({ localUser }) => {
  const [userRosters, setUserRosters] = useState([])
  const [rendCount, setCount] = useState(0)
  useEffect(
    () => {
      getUserRosters(localUser)
        .then((URost) => {
          setUserRosters(URost)
        })
    },
    []
  )
  useEffect(
    () => {
      getUserRosters(localUser)
        .then((URost) => {
          setUserRosters(URost)
        })
    },
    []
  )
  return <><div className="savedroster--container">{userRosters.map((roster) => <SavedRosterList localUser={localUser} getUserRosters={getUserRosters} setUserRosters={setUserRosters} key={roster.id} roster={roster} />)}</div></>
}


