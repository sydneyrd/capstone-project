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


   return <div className="player__results"><div className="player__name">{player?.character?.character_name}</div>
   <div className="player__results">{player?.group}</div>
   <div className="damage">{player?.damage ? <>{percentage(player?.damage, currentCalcRoster.total_damage)}%</> : "0"}
   </div>
      
      <div className="healing">{percentage(player?.healing, currentCalcRoster.total_healing)}%</div>
      <div className="kills">{percentage(player?.kills, currentCalcRoster.total_kills)}%</div> 
      <div className='kdr'>{percentage(player?.assists, currentCalcRoster.total_kills)}%</div>
      <div className="kdr">{KDR()}</div>
   </div>
}


