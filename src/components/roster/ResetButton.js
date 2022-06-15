export const ResetButton = ({setSortedArr, characters}) => {
return <>
<button onClick={() => setSortedArr(characters)}>Reset Filters</button>
</>
}