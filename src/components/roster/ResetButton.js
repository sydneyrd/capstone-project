export const ResetButton = ({setFactionSearch, handleSearchButton, setRoleSearch, setServerSearch, setPrimarySearch, setSecondarySearch}) => {
    const handleReset = (e) => {
    setFactionSearch(0)
    setRoleSearch(0)
    setServerSearch(0)
    setPrimarySearch(0)
 setSecondarySearch(0)
 handleSearchButton(e)
//handlesearchbutton runs the filters again

}
return <>
<button onClick={click =>  {handleReset(click)}
}>Reset Filters</button>
</>
}

