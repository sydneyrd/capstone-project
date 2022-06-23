export const ResultsMap = ({player, totalHealings, totalDam, totalKillings}) => {

    const KDR = player?.kills / player?.deaths
    
    
    const percentage = (partialValue, totalValue) => {
       const results = (100 * partialValue) / totalValue;
        return results.toFixed(2)
     } 
    
    
        return <div className="player__results"><div className="player__name">{player?.name}</div><div className="damage"> Damage: {percentage(player?.damage, totalDam)}% </div>
        <div className="healing">Healing: {percentage(player?.healing, totalHealings)}% </div>
       <div className="kills"> Kills: {percentage(player?.kills, totalKillings)}% </div> <div className="kills"> Assists: {percentage(player?.assists, totalKillings)}</div>
      <div className="kdr">  KDR: {KDR} </div>
    </div>
    }  
        