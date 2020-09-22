import React from "react";
import {Modal, Button} from 'react-bootstrap'

//component
import TableMapping from './TableMapping'


export default function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Mapping {props.fournisseur}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TableMapping/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  