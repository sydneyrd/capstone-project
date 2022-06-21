// i need to render a list of all of the characters in the roster, with input fields next to them, and labels on top telling what they are,
// and on the calculate button press i need to replace the input fields with the calculated statistics.


export const Calculator = ({ characters, rosterChoice }) => {


  let rightName = characters.find(({ id }) => id === rosterChoice?.characterId)




  return <>
    <div>
      <form className="War Statistics">
        
        <fieldset><div>{rightName?.character}</div>
          <input className="form-control"
            placeholder="kills"
            type="number">
          </input>
          <input className="form-control"
            placeholder="deaths"
            type="number"></input>  <input className="form-control"
              placeholder="Assists"
              type="number"></input>

          <input className="form-control"
            placeholder="Healing"
            type="number"></input>
          <input className="form-control"
            placeholder="Damage"
            type="number"></input>
        </fieldset></form>
    </div>
  </>
}
