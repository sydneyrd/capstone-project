import { SearchFilter } from "./SearchFilter"
import { FactionFilter } from "./FilterChoices/FactionFilter"
import { RoleFilter } from "./FilterChoices/RoleFilter"
import { WeaponFilter } from "./FilterChoices/WeaponFilter"
import { ServerFilter } from "./FilterChoices/ServerFilter"
import { ResetButton } from "./ResetButton"
import { useEffect } from "react"
import "./filters.css"

export const FilterContainer = ({ roleSearch, factionSearch, primarySearch, secondarySearch, serverSearch, setPrimarySearch, setSecondarySearch, setServerSearch, setRoleSearch, setFactionSearch,
    setSortedArr, setSearchTerms = { setSearchTerms }, searchTerms = { searchTerms }, characters, weapons, roles, factions, servers }) => {
     
const handleFacSelect = (e) => {
        e.preventDefault()
        setFactionSearch(parseInt(e.target.value))
    }//each of these sets the value of the selected search parameter and we use that in the search button filter process to find matches
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
                .filter(x => x.role === (roleSearch == '' ? x.role : roleSearch))
                .filter(y => y.server === (serverSearch == '' ? y.server : serverSearch))
                .filter(l => l.faction === (factionSearch == '' ? l.faction : factionSearch))
                .filter(k => k.primary_weapon === (primarySearch == '' ? k.primary_weapon : primarySearch))
                .filter(m => m.secondary_weapon === (secondarySearch == '' ? m.secondary_weapon : secondarySearch))
        setSortedArr(searchArr)
    }


    useEffect(
        () => {
            const searchArr =
            characters
                .filter(x => x.role === (roleSearch == '' ? x.role : roleSearch))
                .filter(y => y.server === (serverSearch == '' ? y.server : serverSearch))
                .filter(l => l.faction === (factionSearch == '' ? l.faction : factionSearch))
                .filter(k => k.primary_weapon === (primarySearch == '' ? k.primary_weapon : primarySearch))
                .filter(m => m.secondary_weapon === (secondarySearch == '' ? m.secondary_weapon : secondarySearch))
        setSortedArr(searchArr)




            setSortedArr(searchArr)
        },
        [roleSearch, primarySearch, serverSearch, secondarySearch, factionSearch ]//find what you put into the search bar and set that as sorted
    ) 


//removed the labels, because it looks better, but left the jsx for them if i change my mind or it messes something else up smh
    return <>
        <form className="character_form">
            <fieldset>
                <label htmlFor="role__filter"></label>
                <select onChange={
                    (e) => {
                        handleRoleSelect(e)
                    }}> <option value="0">roles</option>
                    {roles.map((role) => <RoleFilter key={`div--role${role.id}`} role={role} />)}</select>
                <label htmlFor="faction__filter"></label>
                <select onChange={
                    (e) => {
                        handleFacSelect(e)
                    }}><option value="0">factions</option>
                    {factions.map((faction) => <FactionFilter key={`div--faction${faction.id}`} faction={faction} />)}</select>
                <label htmlFor="server__filter"></label>
                <select onChange={
                    (e) => {
                        handleServerSelect(e)
                    }}><option value="0">servers</option>
                    {servers.map((server) => <ServerFilter key={`div--server${server.id}`} server={server} />)}</select>
                <label htmlFor="primary__filter"></label>
                <select onChange={
                    (e) => {
                        handlePrimarySelect(e)
                    }}><option value="0">primary Weapon</option>
                    {weapons.map((weapon) => <WeaponFilter key={`div--weapon${weapon.id}`} weapon={weapon} />)}</select>
                <label htmlFor="secondary"></label>
                <select onChange={
                    (e) => {
                        handleSecondarySelect(e)
                    }}><option value="0">secondary Weapon</option>
                    {weapons.map((weapon) => <WeaponFilter key={`div--weapontwo${weapon.id}`} weapon={weapon} />)}</select><div className="filter__buttons">
                <SearchFilter setSearchTerms={setSearchTerms} />
                {/* <button onClick={(e) => { handleSearchButton(e) }} className="search__button">Search</button> i'm just saving this because i'm afraid to let go.  or it will break */} 
                <ResetButton  handleSearchButton={handleSearchButton} setFactionSearch={setFactionSearch} setRoleSearch={setRoleSearch} setServerSearch={setServerSearch}
                setSecondarySearch={setSecondarySearch} 
                setPrimarySearch={setPrimarySearch} /></div>
            </fieldset></form>
    </>
}
