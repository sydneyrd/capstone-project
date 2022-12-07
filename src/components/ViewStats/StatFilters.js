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
  function compareDamage(a, b) {
    return a.damage - b.damage;
  }
  function compareHeal(a, b) {
    return a.healing - b.healing;
  }
  function compareKill(a, b) {
    return a.kills - b.kills;
  }
  function compareAssist(a, b) {
    return a.assists - b.assists;
  }
//   function compareKDR(a, b) {
// //to sort KDR i need to be able to compare their own kills to deaths, get the total kdr and then compare those two values 
//   }
function sortGroup(click){
    click.preventDefault()
    const copy = [...players]
copy.sort(compareNumbers)
setFilteredPlayers(copy)
}
function sortDamage(click){
    click.preventDefault()
    const copy = [...players]
copy.sort(compareDamage)
setFilteredPlayers(copy)
}
function sortHeal(click){
    click.preventDefault()
    const copy = [...players]
copy.sort(compareHeal)
setFilteredPlayers(copy)
}
function sortKill(click){
    click.preventDefault()
    const copy = [...players]
copy.sort(compareKill)
setFilteredPlayers(copy)
}
function sortAssist(click){
    click.preventDefault()
    const copy = [...players]
copy.sort(compareAssist)
setFilteredPlayers(copy)
}

function roleFilter(event){
    event.preventDefault()
    const copy = [...players]
    const rolePlayers = copy.filter(e => e?.character?.role === parseInt(event.target.value))
    setFilteredPlayers(rolePlayers)
}





    return <>
       <div>
            <button className='button-84' onClick={(click) => {sortGroup(click)}}>Group</button>
            <button className='button-84' onClick={(click)=> {sortDamage(click)}}>Damage</button>
            <button className='button-84' onClick={(click) => {sortHeal(click)}}>Healing</button>
            <button className='button-84' onClick={(click) => {sortKill(click)}}>Kills</button>
            <button className='button-84' onClick={(click)=>{sortAssist(click)}}>Assists</button>
            <button className='button-84'>KDR</button>
            <label htmlFor="roles">
                <select
                onChange={(event) => roleFilter(event)}
                >{roles.map((role) => <RoleSelect key={`role--${role.id}`}role={role}
                />)}
                </select></label>
        </div>
    
    </>

}