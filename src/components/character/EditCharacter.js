//put data on api
import { FactionSelect } from "./FactionSelect"
import { RoleSelect } from "./Role"
import { ServerSelect } from "./ServerSelect"
import { WeaponSelect } from "./WeaponSelect"
import { useState } from "react"
import { putCharacter } from "../APIManager"

//create a push and delete call to be used a GET request for only the users characters to be displayed, need to iterate v that form for all of them
//need the arrays of all the options, weapons etc
//updateCharacter handleUpdateClick handleDeleteClick
export const EditCharacter = ({ ownedCharacter, roles, characters, RosterUserObject, weapons, factions, servers, feedback, setFeedback }) => {

   
   
     
    let [updatedCharacter, updateCharacter] = useState({
        id: ownedCharacter.id,
        userId: ownedCharacter.userId,
        character: ownedCharacter.character,
        roleId: ownedCharacter.roleId,
        primaryweapon: ownedCharacter.primaryweapon,
        secondaryweapon: ownedCharacter.secondaryweapon,
        serverId: ownedCharacter.serverId,
        factionId: ownedCharacter.factionId
    })

  

    

    // let rightServer = servers.find(({ id }) => id === rightCharacter.serverId)
    // let rightPrimary = weapons.find(({ id }) => id === rightCharacter.primaryweapon)
    // let rightSecondary = weapons.find(({ id }) => id === rightCharacter.secondaryweapon) //this one was applying the right values idk
    // let rightFaction = factions.find(({ id }) => id === rightCharacter.factionId)
    // let rightRole = roles.find(({ id }) => id === rightCharacter.roleId)
  

   

    let rightServer = servers.find(({ id }) => id === ownedCharacter?.serverId)
    let rightPrimary = weapons.find(({ id }) => id === ownedCharacter?.primaryweapon)
    let rightSecondary = weapons.find(({ id }) => id === ownedCharacter?.secondaryweapon)
    let rightFaction = parseInt(factions.find(({ id }) => id === ownedCharacter?.factionId))
    let rightRole = parseInt(roles.find(({ id }) => id === ownedCharacter.roleId))
  

   

    const handleUpdateClick = (UC, click) => {//userId
        click.preventDefault()
const letcToAPI =   {  id: UC.id,
userId: parseInt(UC.userId),
character: UC.character,
roleId: parseInt(UC.roleId),
primaryweapon: parseInt(UC.primaryweapon),
secondaryweapon: parseInt(UC.secondaryweapon),
serverId: parseInt(UC.serverId),
factionId: parseInt(UC.factionId)}







        putCharacter(letcToAPI) //push request
        setFeedback("Character Updated")
        //reload area to display updated character info?

    }

  
    return (
        <> <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
            <form className="character_form">
                <h2 className="characterForm__title">Edit Characters</h2>
                <fieldset>
                    <label hmtlFor="charactername">{ownedCharacter.character}</label>
                    <input
                        
                        className="form-control"
                        placeholder="change name"
                        value={ownedCharacter.character} /**onChange{update character state}**/ onChange={
                            (event) => {
                                const copy = { ...updatedCharacter }
                                copy.character = event.target.value
                                updateCharacter(copy)
                            }
                        } />
                    <label>{`${rightRole?.name}`}</label>
                    <select  onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.roleId = event.target.value
                            updateCharacter(copy)
                        }
                    } className="role__select">
                        <option  value={0}>select a role</option>
                        {roles.map((role) => <RoleSelect key={role.id} role={role} />)}
                    </select>

                    <label hmtlFor="weapon__select">{<></>}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.primaryweapon = event.target.value
                            updateCharacter(copy)
                        }
                    } className="character__select">
                        <option value={0}>select a weapon</option>
                        {weapons.map((weapon) => <WeaponSelect key={weapon.id} weapon={weapon} />)}
                    </select>
                    <label htmlFor="second__weapon">{<></>}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.secondaryweapon = event.target.value
                            updateCharacter(copy)
                        }
                    } className="character__second">
                        <option value={0}>select a weapon</option>
                        {weapons.map((weapon) => <WeaponSelect key={weapon.id} weapon={weapon} />)}

                    </select>
                    <label htmlFor="servers">
                        {<></>}</label>
                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.serverId = event.target.value
                            updateCharacter(copy)
                        }
                    } htmlfor="server">
                        <option value={0}>select a server</option>
                        {servers.map((server) => <ServerSelect key={server.id} server={server} />)}
                    </select>
                    <label htmlFor="factions">{<></>}</label>

                    <select onChange={
                        (event) => {
                            const copy = { ...updatedCharacter }
                            copy.factionId = event.target.value
                            updateCharacter(copy)
                        }
                    } className="character__select">
                        <option value={0}>select a faction</option>
                        {factions.map((faction) => <FactionSelect key={faction.id} faction={faction} />)}
                    </select>
                    <button onClick={click => handleUpdateClick(updatedCharacter, click)}>Save</button>
                </fieldset>
            </form>
        </>)
}
