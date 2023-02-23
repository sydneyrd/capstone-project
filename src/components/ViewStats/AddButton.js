import React from 'react';
import  './modal.css'
export const AddButton = ({ triggerText, buttonRef, showModal  }) => {
    return <><button  className="btn btn-lg btn-danger center modal-button"
    ref={buttonRef}
    onClick={showModal} >{triggerText}Add a Player</button></>

}