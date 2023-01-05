import { GroupMap } from "./GroupMap"

export const GroupContainer = ({ group }) => {



const percentage = (partialValue, totalValue) => {
    const results = (100 * partialValue) / totalValue;
    return results.toFixed(2)
 }
const totalGroupDamage = group.reduce((acc, value) => acc + value.damage, 0);
const totalGroupHealing = group.reduce((acc, value) => acc + value.healing, 0);
const totalGroupKillings = group.reduce((acc, value) => acc + value.kills, 0);
const totalGroupAssists = group.reduce((acc, value) => acc + value.assists, 0);
const totalGroupDeaths = group.reduce((acc, value) => acc + value.deaths, 0);
const totalGroupKills = group.reduce((acc, value) => acc + value.kills, 0);
const totalGroupKDR = totalGroupKills / totalGroupDeaths

return (<>
 <h4 className="group__results">Group {group[0].group} KDR{totalGroupKDR.toFixed(2)} </h4>  


{group.map(player =>  
<GroupMap  key={`player--${player.id}`} player={player}/>)}

</>)

}



// Damage{percentage(totalGroupDamage, armyDamage)} Healing {percentage(totalGroupHealing, armyHealing)}
//  Kills {percentage(totalGroupKillings)} Assists {percentage(totalGroupAssists, armyAssists)} Kills {totalGroupKills} Deaths {totalGroupDeaths}