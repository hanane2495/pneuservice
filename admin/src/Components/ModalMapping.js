import React from "react";
import {Modal, Button} from 'react-bootstrap'

//component
import TableMapping from './TableMapping'


export default function MyVerticallyCenteredModal(props) {

  const upload = (e) => {
    const data = new FormData()
    data.append('name', e.target.files[0].name)
    data.append('categoryImage', e.target.files[0])
};



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
  