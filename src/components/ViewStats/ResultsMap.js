export const ResultsMap = ({ player, totalHealings, totalDam, totalKillings, characters }) => {
   const rightCharacter = characters.find(({ id }) => id === player?.character)

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


   return <div className="player__results"><div className="player__name">{rightCharacter?.character_name}</div><div className="damage">{player?.damage ? <>{percentage(player?.damage, totalDam)}%</> : "0"}
   </div>
      <div className="healing">{percentage(player?.healing, totalHealings)}%</div>
      <div className="kills">{percentage(player?.kills, totalKillings)}%</div> <div className="kills">{percentage(player?.assists, totalKillings)}</div>
      <div className="kdr">{KDR()}</div>
   </div>
}


