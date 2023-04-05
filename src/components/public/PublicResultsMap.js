export const PublicResultsMap = ({ player, currentCalcRoster}) => {

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
 
 
    return <div className="player__results"><span className="player--name">{player?.character?.character_name}</span>
    <span className="player--group">{player?.group}</span>
    <span className="player--damage">{player?.damage ? <>{percentage(player?.damage, currentCalcRoster.total_damage)}%</> : "0"}
    </span>
       
       <span className="player--healing">{percentage(player?.healing, currentCalcRoster.total_healing)}%</span>
       <span className="player--kills">{percentage(player?.kills, currentCalcRoster.total_kills)}%</span> 
       <span className='player--assists'>{percentage(player?.assists, currentCalcRoster.total_kills)}%</span>
       <span className="player--kdr">{KDR()}</span>
       <span className="player--links">
   {player.char_links && player.char_links.length > 0 ? (
     player.char_links.map((link) => (
       <>
       <a href={link.link} target="_blank" rel="noreferrer" key={link.id}>
         {link.link}
       </a><hr></hr></>
     ))
   ) : (
     ""
   )}
 </span>
 
       
    </div>
 }
 