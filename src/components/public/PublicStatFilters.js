import "./publicresults.css"
import { RoleSelect } from "../character/Role"
import { getPublicRoles } from "../managers/PublicManager"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const PublicStatFilters = ({players,setGroup, setBase, setFilteredPlayers, sortByArmy, sortByGroup}) => {
    const [roles, setRoles] = useState([])
useEffect(() => {
    getPublicRoles(setRoles)
}, []) 

  function compareDamage(a, b) {
    return b.damage - a.damage;
  }
  function compareHeal(a, b) {
    return b.healing - a.healing;
  }
  function compareKill(a, b) {
    return b.kills - a.kills;
  }
  function compareAssist(a, b) {
    return b.assists - a.assists;
  }
  function compareKDR(a, b) {
 return b.kills / b.deaths - a.kills / a.deaths; 
  }
function sortDamage(click){
    click.preventDefault()
    setBase(false)
    setGroup(false)
    const copy = [...players]
copy.sort(compareDamage)
setFilteredPlayers(copy)

}
function sortHeal(click){
    click.preventDefault()
    setGroup(false)
    const copy = [...players]
copy.sort(compareHeal)
setFilteredPlayers(copy)
}
function sortKill(click){
    click.preventDefault()
    setGroup(false)
    const copy = [...players]
copy.sort(compareKill)
setFilteredPlayers(copy)
}
function sortAssist(click){
    click.preventDefault()
    setGroup(false)
    const copy = [...players]
copy.sort(compareAssist)
setFilteredPlayers(copy)
}
function sortKDR(click){
    click.preventDefault()
    setGroup(false)
    const copy = [...players]
    copy.sort(compareKDR)
    setFilteredPlayers(copy)
}


function roleFilter(event){
    event.preventDefault()
    const copy = [...players]
    const rolePlayers = copy.filter(e => e?.character?.role === parseInt(event.target.value))
    setFilteredPlayers(rolePlayers)
}
function handleReset(click){
    click.preventDefault()
   const copy = [...players]
    setFilteredPlayers(copy)
    setGroup(false)
}




    return <>
       <div>
            <button className='button-84' onClick={click => sortByGroup(click)}>Group</button>
            <button className='button-84' onClick={click => sortByArmy(click)}>Army</button>
            <button className='button-84' onClick={(click)=> {sortDamage(click)}}>Damage</button>
            <button className='button-84' onClick={(click) => {sortHeal(click)}}>Healing</button>
            <button className='button-84' onClick={(click) => {sortKill(click)}}>Kills</button>
            <button className='button-84' onClick={(click)=>{sortAssist(click)}}>Assists</button>
            <button className='button-84' onClick={(click)=>{sortKDR(click)}}>KDR</button>
            <button className='button-84' onClick={(click) => {handleReset(click)}}>Reset</button>
             
            
                <select className='role--select'
                onChange={(event) => roleFilter(event)}
                >{roles.map((role) => <RoleSelect key={`role--${role.id}`}role={role}
                />)}
                </select>
                
        </div>
        <hr className="custom-line-break" />
    </>

}