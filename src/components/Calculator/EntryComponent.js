

import { generateShareRosterToken } from '../managers/UserManager';
import { newCalculatedRoster } from '../managers/CalculatedRosterManager';
import { useState, useEffect } from "react"
import Modal from 'react-modal';
import { RosterList } from './RosterList';



export const EntryComponent = ({handleRosterChange, setSelectedRoster, userRosters, setCreateNewRoster}) => {
    const [isShareModalVisible, setIsShareModalVisible] = useState(false);
    const [generatedUrl, setGeneratedUrl] = useState(null);
    const [newLinkRoster, setNewLinkRoster] = useState({
        rosterName:""
    })
    const handleChange = (e) => {
        e.preventDefault();
        const copy = {...newLinkRoster}
        copy[e.target.name] = e.target.value
        setNewLinkRoster(copy)
      }
    async function generateRosterChoiceUrl() {
        // Fetch the token here (replace this with your actual API call)
        const rosterObj = await newCalculatedRoster(newLinkRoster)
        const tokenBody = {
            roster: rosterObj.id}
        const response = await generateShareRosterToken(tokenBody)
        const data = await response.json();
        const token = data.token;
        // Generate the URL
        const url = `${window.location.origin}/shared/roster/${token}`;
        // Set the generated URL
        setGeneratedUrl(url);
        // Show the modal
        setIsShareModalVisible(true);
      }
      async function copyToClipboard() {
        try {
          await navigator.clipboard.writeText(generatedUrl);
          alert('URL copied to clipboard');
        } catch (err) {
          alert('Failed to copy the URL');
        }
      }

    return  <> <div className="select--or--new">
    <div className="left--header--select">
         <h3>Choose an existing roster</h3> <h4>characters and groups will be pre-assigned</h4>  <select className="roster__select" onChange={(event) => handleRosterChange(event)}><option key="select--0" value={0}>Saved Rosters</option>{userRosters.map((roster) => <RosterList key={roster.id} setSelectedRoster={setSelectedRoster} roster={roster} />)} </select></div>
<span className="middle--or--lol">or</span>
<div className="right--header--new"><h3>Choose from all characters</h3><h4>optionally assign groups</h4>
  <button className="new__roster__button" onClick={(click)=>{setCreateNewRoster(true)}}>Create New</button></div>
  <div className="generate--link--roster">
<h3>Generate a Link</h3>
<h4>This will create an empty war board. Anyone with an account can access the link and add their own character information.</h4>
<input placeholder="give this roster a name before sharing" onChange={handleChange} name="rosterName"

className="link--roster--name" type="text">

</input>
<button className="new__roster__link__button"
onClick={generateRosterChoiceUrl}
>Generate Link</button>
{isShareModalVisible && (
      <div className="modal--share">
        <h3>be careful cutie anyone with access to this link can add their character to your war board.  You can still edit the board later. </h3>
        <input
          type="text"
          readOnly
          value={generatedUrl}
          onClick={() => copyToClipboard()}
        />
        <button onClick={() => setIsShareModalVisible(false)}>Close</button>
      </div>
    )}

  </div>
  
  </div></>
}