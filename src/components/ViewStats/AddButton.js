import React from 'react';
import  './modal.css'
export const AddButton = ({ triggerText, buttonRef, showModal  }) => {
    return <><button  className="add--player--modal"
    ref={buttonRef}
    onClick={showModal} >{triggerText}
    Add a Player</button></>

}