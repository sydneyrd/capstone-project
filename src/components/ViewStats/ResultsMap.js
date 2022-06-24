export const ResultsMap = ({player, totalHealings, totalDam, totalKillings, characters}) => {
   const rightCharacter = characters.find(({ id }) => id === player?.characterId)
    const KDR = player?.kills / player?.deaths
    
    
    const percentage = (partialValue, totalValue) => {
       const results = (100 * partialValue) / totalValue;
        return results.toFixed(2)
     } 
    
    
        return <div className="player__results"><div className="player__name">{rightCharacter?.character}</div><div className="damage">{player?.damage ? <>{percentage(player?.damage, totalDam)}%</>  : "0"}</div>
        <div className="healing">{percentage(player?.healing, totalHealings)}%</div>
       <div className="kills">{percentage(player?.kills, totalKillings)}%</div> <div className="kills">{percentage(player?.assists, totalKillings)}</div>
      <div className="kdr">{KDR.toFixed(2)}</div>
    </div>
    }  
        

   