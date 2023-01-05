//i need to sort the players by group number and then generate statistics for each group
//players with no group should be grouped together at the end


export const GroupMap = ({player}) => {
   // let sumDamage = 0
   // players.map(element => {
   //     sumDamage += element.damage
   // })

   // let sumHealing = 0
   // players.map(element => {
   //     sumHealing += element.healing
   // })

   // let sumKills = 0
   // players.map(element => {
   //     sumKills += element.kills
   // })

   // let sumDeaths = 0
   // players.map(element => {
   //     sumDeaths += element.deaths
   // })
   // const totalDam = sumDamage
   // const totalHealings = sumHealing
   // const totalDyings = sumDeaths
   // const totalKillings = sumKills
   // const armyKDR = totalKillings / totalDyings   //why isn't this working here?

const KDR = () => {
   if (player?.deaths) {
      const KDRresult = player?.kills / player?.deaths
      return KDRresult.toFixed(2) }
      else {
       return player?.kills
      }
 }
   const percentage = (partialValue, totalValue) => {
         const results = (100 * partialValue) / totalValue;
         return results.toFixed(2)
      }
   
   
   return <div className="group__results">
     
      <div className="player__name">{player?.character?.character_name}</div>
      <ul><li>KDR {KDR()}</li>
      
      <li className="damage">{}
      </li>
         </ul>
         
         
      </div>
   }
   
   
   // player?.damage ? <>{percentage(player?.damage, totalDam)}%</> : "0"