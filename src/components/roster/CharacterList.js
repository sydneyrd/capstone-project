import { useState } from 'react';
import { DetailButton } from './Details';

 export const  CharacterList = ({characters, servers, roles, weapons, factions }) => {
  //const [isShown, setIsShown] = useState(false)


//  const characterDetails = () => {isShown &&
 

  



  return (
    <ul className="character__list">
      {characters.map(character => {
        return (
          <li className="character__card"
            key={character.id}
            style={{ height: '100px', border: '1px solid black' }}
          >
            <div >{character.character} <DetailButton character={character} servers={servers} weapons={weapons} factions={factions} roles={roles}/> <button className="add__button">Add to Roster</button> </div> 
        
</li>




          
        )
      })}
    </ul>
    
  
  )
    
}
// onMouseEnter={() => setIsShown(true)}
        // onMouseLeave={() => setIsShown(false)}




// function App() {
//   ;

//   return (
//     <div className="character__details">
//       <button
//         >
        
//       </button>
     
//     </div>
//   );
// }

// React:


// import './App.css';

// function App() {
//   const [isShown, setIsShown] = useState(false);

//   return (
//     <div className="App">
//       <button
//         onMouseEnter={() => setIsShown(true)}
//         onMouseLeave={() => setIsShown(false)}>
//         Hover over me!
//       </button>
//       {isShown && (
//         <div>
//           I'll appear when you hover over the button.
//         </div>
//       )}
//     </div>
//   );
// }