import React from 'react';

function DeleteConfirmationModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this todo?</p>
        <div className="modal-buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;