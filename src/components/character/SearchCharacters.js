


export const SearchCharacters = ({setSearch, searchWords}) => {
    return <> <div className="search_div"><input type="text" value={searchWords} className="input__text"  onChange={
    (event) => {
        setSearch(event.target.value)
    } 
}
placeholder="Search for Player" /></div></>
}

