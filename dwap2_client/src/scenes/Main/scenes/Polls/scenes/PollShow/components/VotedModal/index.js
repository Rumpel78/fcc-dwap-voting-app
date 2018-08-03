import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

const VotedModal = ({ onClose, data }) =>
  (
    <Modal show={data.show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data.success ? 'Voted' : 'Something went wrong...' }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert bsStyle={data.success ? 'success' : 'danger'}>{data.message}</Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );

export default VotedModal;
