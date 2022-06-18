import { CharacterList } from "./CharacterList"
import { DetailButton } from "./Details"
import { useState, useEffect } from "react"

export const ListContainer = ({ setNewRosterPick, newRosterPicks, characters, servers, weapons, factions, roles }) => {
    const [showText, setShowText] = useState(false)
    const [charId, setId] = useState(0)
    //we are capturing the new roster id when we first click add to roster and saving it to start roster  //pass those props ^
    
    const setCharId = e => {
        setId(parseInt(e.target.id))
    } //sets identifier to get correct detail info
    const handleMouseEnter = e => {
        e.target.style.background = "grey"
        setShowText(true)
    } //show pop up element when mouse
    const handleMouseLeave = e => {
        e.target.style.background = "#232220"
        setShowText(false)
        setId(0)
    }//removes the pop up and identifier when mouse leaves
  
    return <> <>
         <section className="character__list">{characters.map((character) =>
                <CharacterList key={`characters--${character.id}`} servers={servers} weapons={weapons} factions={factions}
                    roles={roles} showText={showText} character={character}
                    handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}
                    setCharId={setCharId} charId={charId}
                     setNewRosterPick={setNewRosterPick} newRosterPicks={newRosterPicks}
                   /> )}
            </section></>
<article className="details__element"> 
            {showText && charId > 0 ?
                <><DetailButton charId={charId} showText={showText} servers={servers} weapons={weapons} factions={factions} roles={roles} characters={characters} /> </>
                : <></>}
        </article></>
//only display the detail button if the charId has been set to something other than 0 and showText is true
}

//   const dragStart = e => {
//         const target = e.target;
//         e.dataTransfer.setData("character__card", target.id)
//         setTimeout(() => {
//             target.style.display = "none";
//         }, 0);
//     }
//     const dragOver = e => {
//         e.stopPropagation();
//     } for the drag and drop stuff