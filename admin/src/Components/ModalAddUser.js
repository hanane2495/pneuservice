import React from "react";
import {Modal, Button} from 'react-bootstrap'

//component
import TableMapping from './TableMapping'


export default function AddUser(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ajouter un nouveau utilisateur
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TableMapping/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Sauvegarder</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  