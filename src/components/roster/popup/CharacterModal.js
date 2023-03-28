import React, { useEffect, useState } from 'react';
import { getSingleReadOnlyCharacter } from '../../managers/CharacterManager';
import './modal.css';

// export const CharacterModal = ({ character, onClose }) => {
// const [detailCharacter, setDetailCharacter] = useState({});
// useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };

//     document.addEventListener('keydown', handleEscape);

//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//     };
// }, [character]);
// useEffect(() => {
//    getSingleReadOnlyCharacter(character.id, setDetailCharacter)
// }, [character]);

//   return (
//     <div className="modal__overlay">
//       <div className="modal__content">
//         <h2>{detailCharacter.character_name}</h2>
//         {/* Add character details, images, etc. here */}
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

export const CharacterModal = ({ character, onClose }) => {
  const [detailCharacter, setDetailCharacter] = useState({});

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    getSingleReadOnlyCharacter(character.id, setDetailCharacter);
  }, [character]);

  const openImageInNewTab = (imageUrl) => {
    const imageHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; }
            img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
          </style>
        </head>
        <body>
          <img src="http://localhost:8000${imageUrl}" alt="Full-size image" />
        </body>
      </html>
    `;
  
    const imageWindow = window.open('', '_blank');
    imageWindow.document.write(imageHTML);
    imageWindow.document.close();
  };
  
  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <h2>{detailCharacter.character_name}</h2>
        <p>Role: {detailCharacter.role}</p>
        <p>Faction: {detailCharacter.faction}</p>
        <p>Primary Weapon: {detailCharacter.primary_weapon}</p>
        <p>Secondary Weapon: {detailCharacter.secondary_weapon}</p>
        <p>Server: {detailCharacter.server}</p>
        <p>Notes: {detailCharacter.notes ? detailCharacter.notes : 'N/A'}</p>
        {detailCharacter.image && (
          <img
            src={`http://localhost:8000${detailCharacter.image}`}
            alt={`${detailCharacter.character_name}`}
            className="character-image"
            onClick={() => openImageInNewTab(detailCharacter.image)}
          />
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};