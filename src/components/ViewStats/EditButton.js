//this will provide an edit button for the basestat map that will allow updating each characters stats
import React from 'react';
import  './modal.css'
export const EditButton = ({ triggerText, buttonRef, showModal  }) => {




    return <><button  className="edit--player--modal--button"
      ref={buttonRef}
      onClick={showModal} >{triggerText}Edit</button></>

}