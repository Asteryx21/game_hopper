import React from 'react';
import './Modal.css'

export default function Modal({ show, onClose, selectedGame }) {
    if (!show) {
      return null;
    }
  
    return (
      <div className='modal'>
        <div className='modal-content'>
            <h2 className="modal-title">{selectedGame.title}</h2>
            <div className="modal-body">
                <img src={selectedGame.thumbnail} alt="modal image" className="modal-image" />
                <p className="modal-text" >
                  Publisher: <br></br>
                  <span style={{ color: 'var(--color-light)' }}>{selectedGame.publisher}</span>
                  <br></br>
                  <br></br>
                  Developed by:<br></br> 
                  <span style={{ color: 'var(--color-light)' }}>{selectedGame.developer}</span>
                  <br></br>
                  <br></br>
                  Release date: <br></br>
                  <span style={{ color: 'var(--color-light)' }}>{selectedGame.release_date}</span>
                </p>
            </div>
            <a className='btn close' onClick={onClose}>Close</a>
        </div>
      </div>
    );
}