import { SearchFilter } from "./SearchFilter"
import { FactionFilter } from "./FilterChoices/FactionFilter"
import { RoleFilter } from "./FilterChoices/RoleFilter"
import { WeaponFilter } from "./FilterChoices/WeaponFilter"
import { ServerFilter } from "./FilterChoices/ServerFilter"

export const FilterContainer = ({ roleSearch, factionSearch, serverSearch, setPrimarySearch, setSecondarySearch, setServerSearch, setRoleSearch, setFactionSearch,
    setSortedArr, setSearchTerms = { setSearchTerms }, searchTerms = { searchTerms }, characters, weapons, roles, factions, servers }) => {

    const handleFacSelect = (e) => {
        e.preventDefault()
        setFactionSearch(parseInt(e.target.value))
    }
    const handleRoleSelect = (e) => {
        e.preventDefault(e)
        setRoleSearch(parseInt(e.target.value))
    }
    const handleServerSelect = (e) => {
        e.preventDefault(e)
        setServerSearch(parseInt(e.target.value))
    }
    const handlePrimarySelect = (e) => {
        e.preventDefault(e)
        setPrimarySearch(parseInt(e.target.value))
    }
    const handleSecondarySelect = (e) => {
        e.preventDefault(e)
        setSecondarySearch(parseInt(e.target.value))
    }

    const handleSearchButton = (e) => {
        e.preventDefault(e)
        const searchArr =
            characters
                .filter(x => x.roleId == (roleSearch == '' ? x.roleId : roleSearch))
                .filter(y => y.serverId == (serverSearch == '' ? y.serverId : serverSearch))
                .filter(l => l.factionId == (factionSearch == '' ? l.factionId : factionSearch))
        setSortedArr(searchArr)
    }

    return <>
        <form className="character_form">
            <h2 className="characterForm__title">filter time</h2>
            <fieldset>
                <label htmlFor="role__filter">Roles</label>
                <select onChange={
                    (e) => {
                        handleRoleSelect(e)
                    }}> <option value="0">roles</option>
                    {roles.map((role) => <RoleFilter key={`${role.id}`} role={role} />)}</select>
                <label htmlFor="faction__filter">Factions</label>
                <select onChange={
                    (e) => {
                        handleFacSelect(e)
                    }}><option value="0">factions</option>
                    {factions.map((faction) => <FactionFilter key={`${faction.id}`} faction={faction} />)}</select>
                <label htmlFor="server__filter">Servers</label>
                <select onChange={
                    (e) => {
                        handleServerSelect(e)
                    }}><option value="0">Servers</option>
                    {servers.map((server) => <ServerFilter key={`${server.id}`} server={server} />)}</select>
                <label htmlFor="primary__filter">Primary Weapon:</label>
                <select onChange={
                    (e) => {
                        handlePrimarySelect(e)
                    }}><option value="0">Primary Weapon</option>
                    {weapons.map((weapon) => <WeaponFilter key={`${weapon.id}`} weapon={weapon} />)}</select>
                <label>Secondary Weapon:</label>
                <select onChange={
                    (e) => {
                        handleSecondarySelect(e)
                    }}><option value="0">Secondary Weapon</option>
                    {weapons.map((weapon) => <WeaponFilter key={`${weapon.id}`} weapon={weapon} />)}</select>
                <SearchFilter setSearchTerms={setSearchTerms} />
                <button onClick={(e) => { handleSearchButton(e) }} >Search</button>
            </fieldset></form>
    </>
}
