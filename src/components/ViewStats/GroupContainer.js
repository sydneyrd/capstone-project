import { GroupMap } from "./GroupMap"

export const GroupContainer = ({ group }) => {

const groupKDR = (players) => {
    //need to sort all the players into groups 
    //then calculate the KDR for each group      }
//needs to return .maps for each group and display the group KDR on each element, so need to pass down the groupKDR as a prop to be displayed on the individual group elements
}


return (<>
 {/* <h4 className="group__results">Group {player?.group}</h4>  need to display the group number only once here */}
<div className='group__kdr'>Group KDR</div>  

{group.map(player =>  
<GroupMap player={player}/>)}

</>)

}