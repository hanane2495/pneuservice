import React,{ useState, useEffect} from "react";
import {Modal, Button, Form} from 'react-bootstrap'
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

  const handleDeleteImagePub = (e) => {
    e.preventDefault(); // do not refresh page 

    const id_image_pub = props.id_image
    axios.post(`${process.env.REACT_APP_API_URL}/delete/image/pub`, {id_image_pub})
    .then((res) => {
      setTimeout(() => {
        console.log(res.data)
        setSupprimee(true)
        setResultat(res.data.message)
      }, 1000);
    })
  }

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
          {supprimee ? <p>{resultat}</p> : <p>Etes-vous sure de vouloire supprimer Le Slide Numero {props.id_image} ?</p>}
        <hr/>
        <FooterContent>
             <button 
                className='annuler'
                onClick={props.onHide}>Annuler</button>
             <button 
               className='supprimer'
               onClick={handleDeleteImagePub}>Supprimer</button>
        </FooterContent>
        </Modal.Body>
      </Modal>
    );
  }
  