import { FactionFilter } from "./FilterChoices/FactionFilter"
import { RoleFilter } from "./FilterChoices/RoleFilter"
import { WeaponFilter } from "./FilterChoices/WeaponFilter"
import { ServerFilter } from "./FilterChoices/ServerFilter"
import { ResetButton } from "./ResetButton"
import "./filters.css"


export const FilterContainer = ({ setPrimarySearch, setSecondarySearch, setServerSearch, setRoleSearch, setFactionSearch, weapons, roles, roleSearch, serverSearch, factionSearch, secondarySearch, primarySearch, factions, servers }) => {
     
const handleFacSelect = (e) => {
        e.preventDefault();
        setFactionSearch(parseInt(e.target.value));
    }
const handleRoleSelect = (e) => {
        e.preventDefault(e);
        setRoleSearch(parseInt(e.target.value));
    }
const handleServerSelect = (e) => {
        e.preventDefault(e);
        setServerSearch(parseInt(e.target.value));
    }
const handlePrimarySelect = (e) => {
        e.preventDefault(e);
        setPrimarySearch(parseInt(e.target.value));
    }
 const handleSecondarySelect = (e) => {
        e.preventDefault(e);
        setSecondarySearch(parseInt(e.target.value));
    }

    return <>
        <form className="character_form">
            <fieldset>

                <label htmlFor="role__filter"></label>
                <select value={roleSearch} 
                 onChange={
                    (e) => {
                        handleRoleSelect(e)
                    }}> <option value="0">Roles</option>
                    {roles.map((role) => <RoleFilter key={`div--role${role.id}`} role={role} />)}</select>
                <label htmlFor="faction__filter"></label>
                <select value={factionSearch} 
                onChange={
                    (e) => {
                        handleFacSelect(e)
                    }}><option value="0">Factions</option>
                    {factions.map((faction) => <FactionFilter key={`div--faction${faction.id}`} faction={faction} />)}</select>
                <label htmlFor="server__filter"></label>
                <select value={serverSearch} 
                onChange={
                    (e) => {
                        handleServerSelect(e)
                    }}><option value="0">Servers</option>
                    {servers.map((server) => <ServerFilter key={`div--server${server.id}`} server={server} />)}</select>
                <label htmlFor="primary__filter"></label>
                <select value={primarySearch} 
                onChange={
                    (e) => {
                        handlePrimarySelect(e)
                    }}><option value="0">Primary Weapon</option>
                    {weapons.map((weapon) => <WeaponFilter key={`div--weapon${weapon.id}`} weapon={weapon} />)}</select>
                <label htmlFor="secondary"></label>
                <select value={secondarySearch} 
                onChange={
                    (e) => {
                        handleSecondarySelect(e)
                    }}><option value="0">Secondary Weapon</option>
                    {weapons.map((weapon) => <WeaponFilter key={`div--weapontwo${weapon.id}`} weapon={weapon} />)}</select><div className="filter__buttons">
                <ResetButton   setFactionSearch={setFactionSearch} setRoleSearch={setRoleSearch} setServerSearch={setServerSearch}
                setSecondarySearch={setSecondarySearch} 
                setPrimarySearch={setPrimarySearch} /></div>
            </fieldset></form>
    </>
}
