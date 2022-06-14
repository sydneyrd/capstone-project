import { SearchFilter } from "./SearchFilter"

export const FilterContainer = ({setFilterButton, filterButton, setSearchTerms={setSearchTerms}, searchTerms={searchTerms}, characters, weapons, roles, factions, servers}) => {
  
   
   return <>
<form className="character_form">
                <h2 className="characterForm__title">filter time</h2>
                <fieldset>
                    <label htmlFor="role__filter">Roles</label>
                   <select> <option>roles</option></select>
                    <label htmlFor="faction__filter">Factions</label>
                    <select><option>factions</option></select>
                    <label htmlFor="server__filter">Servers</label>
                    <select><option>Servers</option></select>
                    <label htmlFor="primary__filter">Primary Weapon:</label>
                    <select><option>Primary Weapon</option></select>
                    <label>Secondary Weapon:</label>
                    <select><option>Secondary Weapon</option></select>
                    <SearchFilter setSearchTerms={setSearchTerms}/>
                    <button >Search</button>
                    </fieldset></form>
</>
}

//filter by roles, factions, servers, weapons


// const handleSearch = () => {
//     setFilterButton(true)
//    }onClick={handleSearch}