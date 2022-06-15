export const SearchFilter = ({ setSearchTerms }) => {
    
    return <> <div><input type="text" onChange={
        (changeEvent) => {
            setSearchTerms(changeEvent.target.value)
        } //sets the state of our searchTerms to whatever is input here
    }
placeholder="Search for Player" /></div></>
}

