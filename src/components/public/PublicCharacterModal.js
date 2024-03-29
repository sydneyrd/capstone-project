import React, { useEffect, useState } from 'react';
import { getSinglePublicCharacter } from '../managers/PublicManager';
import './publicmodal.css';

export const PublicCharacterModal = ({ character, onClose }) => {
  const [detailCharacter, setDetailCharacter] = useState({});
  useEffect(() => {
    getSinglePublicCharacter(character.id, setDetailCharacter);
   }, [character]);
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
          <img src="${imageUrl}" alt="Full-size image" />
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
        <div className="container--top">
        <div className="left--container">
        <h2>{detailCharacter.character_name}</h2>
        <p>Role: {detailCharacter.role}</p>
        <p>Faction: {detailCharacter.faction}</p>
        <p>Primary Weapon: {detailCharacter.primary_weapon}</p>
        <p>Secondary Weapon: {detailCharacter.secondary_weapon}</p>
        <p>Server: {detailCharacter.server}</p>
        <p>Notes: {detailCharacter.notes ? detailCharacter.notes : 'N/A'}</p></div>
<div className="right--container">
{detailCharacter.character_links && (
          <div className="character-links">
            {detailCharacter.character_links.map((link) => { return(
              <li key={`link--${link.id}`}><a href={`${link.link}`} target="_blank"
                        rel="noreferrer" key={`link--${link.id}`}>{link.link}</a>
                        </li>
              )
            }
        )}</div>)}</div></div>

        {detailCharacter.image && (
          <img
            src={`${detailCharacter.image}`}
            alt={`${detailCharacter.character_name}`}
            className="character-image"
            onClick={() => openImageInNewTab(detailCharacter.image)}
          />
        )}
        
        <button className="modal--button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};