


export const SearchCharacters = ({setSearch, searchWords}) => {
    return <> <div className="search--container--char"><input type="text" value={searchWords} className="input__text"  onChange={
    (event) => {
        setSearch(event.target.value)
    } 
}
placeholder="search characters..." /></div></>
}

