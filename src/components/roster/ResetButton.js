export const ResetButton = ({setFactionSearch, setRoleSearch, setServerSearch, setPrimarySearch, setSecondarySearch}) => {
    const handleReset = (e) => {
    e.preventDefault(e);
    setFactionSearch(0);
    setRoleSearch(0);
    setServerSearch(0);
    setPrimarySearch(0);
 setSecondarySearch(0);
}
return <>
<button className="reset__button" onClick={click =>  handleReset(click)
}>Reset Filters</button>
</>
}

