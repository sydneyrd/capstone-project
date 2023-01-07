import { GroupMap } from "./GroupMap"

export const GroupContainer = ({ group, currentCalcRoster }) => {



const percentage = (partialValue, totalValue) => {
    const results = (100 * partialValue) / totalValue;
    return results.toFixed(2)
 }


const totalGroupDamage = percentage(group.reduce((acc, value) => acc + value.damage, 0), currentCalcRoster.total_damage);
const totalGroupHealing = percentage(group.reduce((acc, value) => acc + value.healing, 0), currentCalcRoster.total_healing);
const totalGroupKillings = percentage(group.reduce((acc, value) => acc + value.kills, 0), currentCalcRoster.total_kills);
const totalGroupAssists = percentage(group.reduce((acc, value) => acc + value.assists, 0), currentCalcRoster.total_kills);
const totalGroupDeaths = percentage(group.reduce((acc, value) => acc + value.deaths, 0), currentCalcRoster.total_deaths);
const totalGroupKills = percentage(group.reduce((acc, value) => acc + value.kills, 0), currentCalcRoster.total_kills);
const totalGroupKDR = totalGroupKills / totalGroupDeaths
console.log(totalGroupDamage)
return (<>
<div className='group_card'>
{ group[0].group ? 
<h3>Group {group[0].group}</h3>
: <h3>Group 0</h3>}
 <h4 className="group__results">KDR {totalGroupKDR.toFixed(2)} Damage {totalGroupDamage}%
 Healing {totalGroupHealing}% Kills {totalGroupKillings}% Assists {totalGroupAssists}% Deaths {totalGroupDeaths}
 </h4>  


{group.map(player =>  
<GroupMap  key={`player--${player.id}`} player={player}/>)}

</div></>)

}

