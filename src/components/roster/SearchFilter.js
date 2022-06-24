export const SearchFilter = ({ setSearchTerms }) => {
    
    return <> <div className="search_div"><input type="text" className="input__text"  onChange={
        (changeEvent) => {
            setSearchTerms(changeEvent.target.value)
        } //sets the state of our searchTerms to whatever is input here
    }
placeholder="search for player..." /></div></>
}

