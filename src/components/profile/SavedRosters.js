import { useEffect, useState } from "react"
import { getUserRosters } from "../managers/UserManager"
import { SavedRosterList } from "./SavedRosterList"


export const SavedRosters = ({ localUser }) => {
  const [userRosters, setUserRosters] = useState([])
  useEffect(
    () => {
      getUserRosters(setUserRosters)
     
    },
    []
  )
  return <div className="savedroster--container">{userRosters.map((roster) => <SavedRosterList localUser={localUser} getUserRosters={getUserRosters} setUserRosters={setUserRosters} key={roster.id} roster={roster} />)}</div>
}


