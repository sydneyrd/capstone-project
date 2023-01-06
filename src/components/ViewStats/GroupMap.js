//i need to sort the players by group number and then generate statistics for each group
//players with no group should be grouped together at the end


export const GroupMap = ({player}) => {

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
      </div>
   }