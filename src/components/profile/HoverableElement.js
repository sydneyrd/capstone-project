import React, { useState } from 'react';
import './hoverablelement.css';


export const HoverableElement = ({ children, tooltipText, onElementClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setShowTooltip(true);
    console.log("hi")
  };

  const handleMouseLeave = () => {
    console.log('bye')
    setShowTooltip(false);
  };

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="hoverable-element"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={onElementClick}
    >
      <span>{children}</span>
      {showTooltip && (
        <div
          className="tooltip"
          style={{
            left: position.x + 10,
            top: position.y + 10,
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};



