export const ResultsMap = ({ player, currentCalcRoster}) => {

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


   return <div className="player__results"><span className="player__name">{player?.character?.character_name}</span>
   <span className="player__results">{player?.group}</span>
   <span className="damage">{player?.damage ? <>{percentage(player?.damage, currentCalcRoster.total_damage)}%</> : "0"}
   </span>
      
      <span className="healing">{percentage(player?.healing, currentCalcRoster.total_healing)}%</span>
      <span className="kills">{percentage(player?.kills, currentCalcRoster.total_kills)}%</span> 
      <span className='kdr'>{percentage(player?.assists, currentCalcRoster.total_kills)}%</span>
      <span className="kdr">{KDR()}</span>
      
   </div>
}


