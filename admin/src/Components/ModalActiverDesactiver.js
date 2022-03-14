import React, {useState, useEffect} from "react";
import {Modal, Button, Form} from 'react-bootstrap'
import styled from 'styled-components'
import axios from 'axios'

const FormStyle = styled.form`
    display:flex;
    flex-direction:column;
    width:100%;
    height:200px;
    .form-row-1{
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        width:100%;
    }

    .form-input-1{
        width:45%;
        height:50px;
        margin: 1.5%;
        padding:2%;
    }

    .form-input-2{
        width:93%;
        height:50px;
        margin: 1%;
        padding:2%;
    }

    .form-row-2{
        display:flex;
        flex-direction:row;
        justify-content:flex-end;
        align-items:flex-end;
        width:100%;
        margin:5% 2% 0 0;
    }

    .form-button{
        padding:1.5% 5%;
        margin:2%;
        border-radius:5px;
        border:none;
    }
`;

export default function MyVerticallyCenteredModalStock(props) {

  const [message, setMessage] = useState(null)
  const [statut, setStatut] = useState('desactivé')
  

  //handle change promo
  const handleChangeStatut = (e) => {
    setStatut(e.target.value)
}

  // Submit fichier stock
  const handleSubmit = (e) => {
    e.preventDefault();// do not refresh page 
    

    if(props.collection == 'true'){
      
    }

    if(props.marque == 'true'){
      let dataToUpdate = props.dataToUpdate 
      let categorie = props.categorieCol
      axios.post(`${process.env.REACT_APP_API_URL}/ajouter/promo/marque`, {dataToUpdate, statut, categorie})
      .then((res) => {
        console.log(props.categorie)
        console.log(res.data.message)
        console.log(res.data.statut)
        setMessage(res.data.message)
      })

      //handle errors
      .catch((err) => {
        console.log(err.response);
      });
    }

    if(props.categorie == 'agricole'){
      //send data to server  
      let dataToUpdate = props.dataToUpdate 
      axios.post(`${process.env.REACT_APP_API_URL}/activer/desactiver/pneu/agricole`, {dataToUpdate, statut})
      .then((res) => {
        console.log(props.categorie)
        console.log(res.data.message)
        console.log(res.data.statut)
        setMessage(res.data.message)
      })

      //handle errors
      .catch((err) => {
        console.log(err.response);
      });

    }else if(props.categorie == 'auto'){

      //send data to server  
      let dataToUpdate = props.dataToUpdate 
      axios.post(`${process.env.REACT_APP_API_URL}/activer/desactiver/pneu/auto`, {dataToUpdate, statut})
      .then((res) => {
        console.log(props.categorie)
        console.log(res.data.message)
        console.log(res.data.statut)
        setMessage(res.data.message)
      })

      //handle errors
      .catch((err) => {
        console.log(err.response);
      });

    }else if(props.categorie == 'moto'){

      //send data to server  
      let dataToUpdate = props.dataToUpdate 
      axios.post(`${process.env.REACT_APP_API_URL}/activer/desactiver/pneu/moto`, {dataToUpdate, statut})
      .then((res) => {
        console.log(props.categorie)
        console.log(res.data.message)
        console.log(res.data.statut)
        setMessage(res.data.message)
      })

      //handle errors
      .catch((err) => {
        console.log(err.response);
      });

    }else if(props.categorie == 'poids lourd'){

      //send data to server  
      let dataToUpdate = props.dataToUpdate 
      axios.post(`${process.env.REACT_APP_API_URL}/activer/desactiver/pneu/pl`, {dataToUpdate, statut})
      .then((res) => {
        console.log(props.categorie)
        console.log(res.data.message)
        console.log(res.data.statut)
        setMessage(res.data.message)
      })

      //handle errors
      .catch((err) => {
        console.log(err.response);
      });

    }else if(props.categorie == 'collection'){
      let dataToUpdate = props.dataToUpdate 
      let categorie = props.categorieCol
      axios.post(`${process.env.REACT_APP_API_URL}/activer/desactiver/collection`, {dataToUpdate, statut, categorie})
      .then((res) => {
        console.log(props.categorie)
        console.log(res.data.message)
        console.log(res.data.statut)
        setMessage(res.data.message)
      })

      //handle errors
      .catch((err) => {
        console.log(err.response);
      });
    }else if(props.categorie == 'marque'){
      let dataToUpdate = props.dataToUpdate 
      let categorie = props.categorieCol
      axios.post(`${process.env.REACT_APP_API_URL}/activer/desactiver/marque`, {dataToUpdate, statut, categorie})
      .then((res) => {
        console.log(props.categorie)
        console.log(res.data.message)
        console.log(res.data.statut)
        setMessage(res.data.message)
      })

      //handle errors
      .catch((err) => {
        console.log(err.response);
      });
    }
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
            Activer/ desactiver les pneus selctionnés ! 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FormStyle>
          <form onSubmit={handleSubmit}>
           <h5>choisissez une option</h5>
           <Form.Control 
              as="select"
              value={statut}
              onChange={handleChangeStatut}
            >
                <option>-- --</option>
                <option>Actif</option>
                <option>Desactivé</option>
           </Form.Control>
           {message == null ? null : 
              <div>
                <h6 style={{color:'green'}}>{message} !</h6>
              </div>
            }
            <Button type='submit' variant="contained" style={{background:'#aaa', marginTop:'20px'}}>
              Envoyer
            </Button>
          </form>
        </FormStyle>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  

  