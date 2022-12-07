import "./results.css"
import { RoleSelect } from "../character/Role"
import { getAllRoles } from "../APIManager"
import { useEffect, useState } from "react"

export const StatFilters = ({players, setFilteredPlayers}) => {
    const [roles, setRoles] = useState([])
useEffect(() => {
    getAllRoles(setRoles)
}, []) 

function compareNumbers(a, b) {
    return a.group - b.group;
  }
function sortGroup(click){
    click.preventDefault()
    const copy = [...players]
copy.sort(compareNumbers)
setFilteredPlayers(copy)
}



    return <>
       <div>
            <button className='button-84' onClick={(click) => {sortGroup(click)}}>Group</button>
            <button className='button-84'>Damage</button>
            <button className='button-84'>Healing</button>
            <button className='button-84'>Kills</button>
            <button className='button-84'>Assists</button>
            <button className='button-84'>KDR</button>
            <label htmlFor="roles">
                <select>{roles.map((role) => <RoleSelect key={`role--${role.id}`}role={role}
                />)}
                </select></label>
        </div>
    
    </>

}