


export const SearchCharacters = ({setSearch, searchWords}) => {
    return <> <input type="text" value={searchWords} className="input__text"  onChange={
    (event) => {
        setSearch(event.target.value)
    } 
}
placeholder="search characters..." /></>
}

