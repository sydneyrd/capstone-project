// i need to render a list of all of the characters in the roster, with input fields next to them, and labels on top telling what they are,
// and on the calculate button press i need to replace the input fields with the calculated statistics.


export const Calculator = ({FC}) => {

    //need to get character list to obtain the correct names as well
    //get roster choices list//  populate a div with the roster choices, let each line display the character name and have input fields forrrrr
    //kill percentage, damage percentage, and healing percentage
    //should display results in order of how well they did?
//get the roster ID and then compare it to the characters to get the correct info
//.map it to produce the form 

    return  <><div key={FC.id}>Some text for testing</div>
            <div>
            <form className="War Statistics">
                <h4 className="">{FC?.character}</h4>
                <fieldset>
                    <input className="form-control"
                        placeholder="kills"
                         type="number">
                        </input>
                        <input className="form-control"
                        placeholder="deaths"
                         type="number"></input>
                          <input className="form-control"
                        placeholder="Damage"
                         type="number"></input>
                          <input className="form-control"
                        placeholder="Healing"
                         type="number"></input>
                       </fieldset></form>
</div>
</>
}

