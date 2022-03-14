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
  const [promos, setPromos] = useState([])
  const [promo, setPromo] = useState(null)
  const [id_promo, setId_promo] = useState(null)
  const [promoAffichee, setPromoAffichee] = useState('')


  //get all promos
  useEffect(() => {
  axios.post(`${process.env.REACT_APP_API_URL}/get/promo`)
  .then(res => { 
    console.log(res.data)
    setPromos(res.data)
  })
  .catch(err => {
    console.log(err)
  })
  }, []) 

  

  //handle change promo
  const handleChangePromo = (e) => {
    setPromoAffichee(e.target.value)
    if(e.target.value == 'aucune'){
      setPromo(null) 
      setId_promo(null)
    }else{
      
      promos.map((promo) => {
        if(e.target.value.includes(promo.nom_promo)){
          setPromo(promo.valeur_promo)
          setId_promo(promo.id_promo)
        }
      })
    }
     
    console.log(e.target.value)
}

  // Submit fichier stock
  const handleSubmit = (e) => {
    e.preventDefault(); // do not refresh page 
    
    if(props.categorie == 'agricole'){
      //send data to server  
      let valeur_promo = promo 
      let dataToUpdate = props.dataToUpdate
      console.log(id_promo)
      console.log(dataToUpdate)
      console.log(valeur_promo)
      axios.post(`${process.env.REACT_APP_API_URL}/ajouter/promo/agricole`, {dataToUpdate, valeur_promo, id_promo})
      .then((res) => {
        console.log(res.data.message)
        setMessage(res.data.message)
      })

      //handle errors
      .catch((err) => {
        console.log(err.response);
      });

    }else if(props.categorie == 'auto'){

      //send data to server 
      let valeur_promo = promo 
      let dataToUpdate = props.dataToUpdate
      axios.post(`${process.env.REACT_APP_API_URL}/ajouter/promo/auto`, {dataToUpdate, valeur_promo, id_promo})
      .then((res) => {
        console.log(props.categorie)
        console.log(res.data.message)
        setMessage(res.data.message)
      })

      //handle errors
      .catch((err) => {
        console.log(err.response);
      });

    }else if(props.categorie == 'moto'){

      //send data to server  
      let valeur_promo = promo 
      let dataToUpdate = props.dataToUpdate
      axios.post(`${process.env.REACT_APP_API_URL}/ajouter/promo/moto`, {dataToUpdate, valeur_promo, id_promo})
      .then((res) => {
        console.log(props.categorie)
        console.log(res.data.message)
        setMessage(res.data.message)
      })

      //handle errors
      .catch((err) => {
        console.log(err.response);
      });

    }else if(props.categorie == 'poids lourd'){

      //send data to server  
      let dataToUpdate = props.dataToUpdate
      let valeur_promo = promo 
      axios.post(`${process.env.REACT_APP_API_URL}/ajouter/promo/pl`, {dataToUpdate, valeur_promo, id_promo})
      .then((res) => {
        console.log(props.categorie)
        console.log(res.data.message)
        setMessage(res.data.message)
      })

      //handle errors
      .catch((err) => {
        console.log(err.response);
      });

    }else if(props.categorie == 'collection'){
      let categorie = props.categorieCol
      let dataToUpdate = props.dataToUpdate
      let valeur_promo = promo 
      axios.post(`${process.env.REACT_APP_API_URL}/ajouter/promo/collection`, {dataToUpdate, valeur_promo, id_promo, categorie})
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
      let categorie = props.categorieCol
      let dataToUpdate = props.dataToUpdate
      let valeur_promo = promo 
      axios.post(`${process.env.REACT_APP_API_URL}/ajouter/promo/marque`, {dataToUpdate, valeur_promo, id_promo, categorie})
      .then((res) => {
        console.log(props.categorie)
        console.log(props.categorieCol)
        console.log(props.dataToUpdate)
        console.log(res.data.message)
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
            Ajouter une promo à la selection ! 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FormStyle>
          <form onSubmit={handleSubmit}>
           <h5>Choisissez une promo</h5>
           <Form.Control 
              as="select"
              value={promoAffichee}
              onChange={handleChangePromo}
            >
                <option>aucune</option>
                {promos.map((promo) => 
                  <option>{promo.nom_promo} (-{promo.valeur_promo}%)</option>
                )}
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
  

  