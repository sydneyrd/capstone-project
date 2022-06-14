import { useState } from 'react';
import { DetailButton } from './Details';

export const CharacterList = ({ setCharId, character, servers, weapons, factions, roles, showText, handleMouseEnter, handleMouseLeave }) => {
 

  return (
    <li className="character__card"

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} >
      {character.character}
      < button className="add__button" id={character.id} onMouseOver={setCharId} > Add to Roster</button >


    
    </li>
  )
}
  // {showText ?
//  let rightServer = servers.find(({ id }) => id === character.serverId)
//   let rightPrimary = weapons.find(({ id }) => id === character.primaryweapon)
//   let rightSecondary = weapons.find(({ id }) => id === character.secondaryweapon)
//   let rightFaction = factions.find(({ id }) => id === character.factionId)
//   let rightRole = roles.find(({ id }) => id === character.roleId)


  //       (<>
  //         <div className="App">


  //           {
  //             <section className="message" key={character.id}>
  //               <h3>{character.character}</h3>
  //               <>{rightRole.name}
  //                 <br></br>
  //                 Primary Weapon: {rightPrimary.name}
  //                 <br></br>
  //                 Secondary Weapon: {rightSecondary.name}
  //                 <br></br>
  //                 Server: {rightServer.name}
  //                 <br></br>
  //                 Faction: {rightFaction.name}
  //               </>

  //             </section>
  //           }</div>
  //       </>
  //       )



  //       : (<></>)
  //     }