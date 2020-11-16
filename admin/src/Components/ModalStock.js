import React from "react";
import {Modal, Button} from 'react-bootstrap'


import Stepper from '../Components/AddStockStepper' 

export default function MyVerticallyCenteredModalStock(props) {
  
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ajouter un Nouveau stock 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stepper id_fournisseur ={props.fournisseur}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  

  