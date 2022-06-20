import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { getUserRosters } from "../APIManager"
import { SavedRosterList } from "./SavedRosterList"
export const SavedRosters = ({ localUser }) => {
 
  //if statement no saved rosters no display
  //    const onClickFunc = (e) => {
  //     e.preventDefault()
  //     {
  //         localStorage.setItem("roster_user", JSON.stringify({
  //             RosterId: correctRoster.Id

  //         }))
  // }   
  const [userRosters, setUserRosters] = useState([])

useEffect(
  () => {
    getUserRosters(localUser)
      .then((URost) => {
        setUserRosters(URost)
      })
  },
  [] 
)

//just put this useEffect here to try and rerender when deleting, it might break something watch it sundaymorning
useEffect(
  () => {
    getUserRosters(localUser)
      .then((URost) => {
        setUserRosters(URost)
      })
  },
  [userRosters] 
)


  return <><div className="savedroster--container">{userRosters.map((roster) => <SavedRosterList  key={roster.id} roster={roster} />)}</div></>
}


