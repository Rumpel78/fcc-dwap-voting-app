import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const VotedModal = ({ name, show, onClose }) =>
  (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Voted</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You have voted for {name}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );

export default VotedModal;
