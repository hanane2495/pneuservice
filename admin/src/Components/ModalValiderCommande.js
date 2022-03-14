import React,{ useState, useEffect} from "react";
import {Modal, Button, Form, ButtonGroup, ToggleButton} from 'react-bootstrap'
import styled from 'styled-components';
import axios from 'axios'



const FooterContent = styled.div`
 display:flex;
 flex-direction:row;
 justify-content:center;
 align-items:center; 

 .annuler{
    height : 40px;
    width : 100px;
    background : #999;
    border: 3px solid white;
    border-radius: 10px;
    color:white;
    margin : 0 10px;
 }

 .supprimer{
    height : 40px;
    width : 100px;
    background : red;
    border: 3px solid white;
    border-radius: 10px;
    color:white;
    margin : 0 10px;
 }
`;

export default function MyVerticallyCenteredModalImage(props) {

  const [resultat, setResultat] = useState('')
  const [supprimee, setSupprimee] = useState(false)
  const [message, setMessage] = useState('')

  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Validée', value: 'validée' },
    { name: 'Refusée', value: 'refusée' }
  ];

  ///valider/refuser/commande

  /*
  const validerCommande = () => {
    const id_commande = props.id_commande
    const etat = 'validée'
    axios.post(`${process.env.REACT_APP_API_URL}/valider/refuser/commande`, {etat, id_commande})
    .then((res) => {
     
        console.log(res.data)
        setMessage(res.data.message)
   
    })
  }

  const RefuserCommande = () => {
    const id_commande = props.id_commande
    const etat = 'refusée'
    axios.post(`${process.env.REACT_APP_API_URL}/valider/refuser/commande`, {etat, id_commande})
    .then((res) => {
        console.log(res.data)
        setMessage(res.data.message)
    })
  }
  */
  

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
               Supprimer le Slide           
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <ButtonGroup toggle>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                type="radio"
                variant="secondary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>

          {message !== '' ? <p>{message}</p> : <p>la commande selectionnee est en attente, veuillez la valider ou la refuser !</p>}
        <hr/>
        <FooterContent>
            
        </FooterContent>
        </Modal.Body>
      </Modal>
    );
  }
  

  /**
   *  <button 
                className='annuler'
                onClick={validerCommande()}>Valider</button>
             <button 
               className='supprimer'
               onClick={RefuserCommande()}>Refuser</button>
   */