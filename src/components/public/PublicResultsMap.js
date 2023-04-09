import {PublicCharacterModal} from "./PublicCharacterModal";
import { useState } from "react";

export const PublicResultsMap = ({ player, currentCalcRoster}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }
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
 
 
    return <div key={`player--${player.id}`} className="player__results"><span style={{color: "blue", cursor: "pointer"}} onClick={toggleModal} className="player--name">{player?.character?.character_name}</span>
    <span key={`player--group${player.id}`} className="player--group">{player?.group}</span>
    <span key={`player--damage${player.id}`} className="player--damage">{player?.damage ? <>{percentage(player?.damage, currentCalcRoster.total_damage)}%</> : "0"}
    </span>
       
       <span key={`player--healing${player.id}`} className="player--healing">{percentage(player?.healing, currentCalcRoster.total_healing)}%</span>
       <span key={`player--kills${player.id}`} className="player--kills">{percentage(player?.kills, currentCalcRoster.total_kills)}%</span> 
       <span key={`player--assists${player.id}`} className='player--assists'>{percentage(player?.assists, currentCalcRoster.total_kills)}%</span>
       <span key={`player--kdr${player.id}`} className="player--kdr">{KDR()}</span>
       <span key={`player--links${player.id}`} className="player--links">
   {player.char_links && player.char_links.length > 0 ? (
     player.char_links.map((link) => (
       <>
       <a href={link.link} target="_blank" rel="noreferrer" key={`links--${link.id}`} >
         {link.link}
       </a><hr></hr></>
     ))
   ) : (
     ""
   )}
 </span>
 
       
    {modalVisible && ( // Conditionally render the modal based on the state
        <PublicCharacterModal detailCharacter={player.character} onClose={toggleModal} />
      )}</div>
 }
 