
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
     
      <li className="player__name">{player?.character?.character_name}</li>
      </div>
   }