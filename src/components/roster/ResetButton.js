export const ResetButton = ({setFactionSearch, setRoleSearch, setServerSearch, setPrimarySearch, setSecondarySearch}) => {
    const handleReset = (e) => {
    e.preventDefault()
    setFactionSearch(0)
    setRoleSearch(0)
    setServerSearch(0)
    setPrimarySearch(0)
 setSecondarySearch(0)
}
return <>
<button onClick={(e) => handleReset
}>Reset Filters</button>
</>
}

