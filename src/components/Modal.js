import React from 'react';
import '../styles/styles.css';

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="modal-content">
          <div className="cv-section">
            {children[0]} {/* Ceci rendra le composant CV */}
          </div>
          <div className="chatbot-section">
            {children[1]} {/* Ceci rendra le composant Chatbot */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;