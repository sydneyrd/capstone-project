


export const SearchCharacters = ({setSearch, searchWords}) => {
    
    
    return <> <div className="search_div"><input type="text" className="input__text"  onChange={
    (changeEvent) => {
        setSearch(changeEvent.target.value)
    } //sets the state of our searchTerms to whatever is input here
}
placeholder="Search for Player" /></div></>
}

