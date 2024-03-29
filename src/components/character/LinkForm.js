import React, { useState } from "react";
import { newLink, getCalculatedRostersByCharacter } from "../managers/CharacterManager";
import './linkform.css' 



export const LinkModal = ({ character, characterId,setModalIsOpen, getCharacterLinks, setCharacterLinks }) => {
    const [link, setLink] = useState({
        link: "",
        character: parseInt(characterId)

    })
    const [characterCalculatedRoster, setCharacterCalculatedRoster] = useState([])
    useState(() => {
        getCalculatedRostersByCharacter(characterId, setCharacterCalculatedRoster)
    }, [])

    const closeModal = () => {
        setModalIsOpen(false);
      }
    const handleNewLink = (click) => {
        click.preventDefault();
        try {
            let linkCopy = { ...link };
            let urlString = linkCopy.link;
            if (!urlString.startsWith("http://") && !urlString.startsWith("https://")) {
                urlString = "http://" + urlString;
            }
            linkCopy.link = urlString;
            const myUrl = new URL(urlString);
            
            newLink(linkCopy).then((res) => { getCharacterLinks(characterId, setCharacterLinks) })
        } catch (err) {
            console.error("Invalid URL:", err);
        };
        closeModal();
    };

    const handleChange = (e) => {
        e.preventDefault();
        const linkCopy = { ...link }
        linkCopy[e.target.name] = e.target.value
        linkCopy["character"] = character?.id
        // i need to be able to assign these to specific calculated rosters
        setLink(linkCopy)
    }

    return  <>
    
    <button className="close-button" onClick={closeModal}>X</button>
    <form className="add--link--form">
        <fieldset className="add__link__form">
    <div className="vod--links"> <h4>add a vod link</h4>
    <div className="link--input"><input type="url" className="form-control" name="link" value={link.link} onChange={handleChange} placeholder="vod link?" />
    <span>Assign to War Board?</span>
    <select
        name="calculated_roster"
    onChange={handleChange}
    >
    <option value={0}>No Assigned War</option>
    {
        characterCalculatedRoster.map((calculatedRoster) => {
            return (
                <option key={calculatedRoster.id} value={calculatedRoster.id}>
                    {calculatedRoster.name ? calculatedRoster.name : `Roster #${calculatedRoster.id}`}
                </option>
            );
        })
    }
</select>


        <button className="link__button" onClick={click => handleNewLink(click)}>New Link</button></div></div></fieldset></form></>

}
