import React, {useState, useEffect} from "react";
import { Carousel } from "react-bootstrap";
import styled from 'styled-components'
import axios from 'axios'
import default_pub from '../assets/background1.jpg'
import default_pub1 from '../assets/background2.jpg'
import default_pub2 from '../assets/profile1.jpg'

import {MdModeEdit} from 'react-icons/md'

//modals
import ModifierPub from '../Components/ModalModifierPub'
import SupprimerPub from '../Components/ModalSupprimerPub'
import ModifierSlogan from '../Components/ModalModifierSlogan'

const Styles = styled.div`
 .carousel-container{
     height: 500px;
     width: 800px;
 }
 .slogan-container{
     display : flex;
     flex-direction:row;
     justify-content:center;
     align-items:center;
 }

 .edit-button{
    height : 50px;
    width : 120px;
    background : rgba(255, 255, 255, 0.3);
    border: 3px solid white;
    border-radius: 10px;
    color:white;
    margin : 0 10px;
 }

 .suppr-button{
    height : 50px;
    width : 120px;
    border: 3px solid red;
    background : rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    color:red;
    margin : 0 10px;
 }

 .add-button{
    height : 50px;
    width : 120px;
    border: 3px solid green;
    background : rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    color:green;
    margin : 0 10px;
 }

 .petit-edit-button{
    height : 30px;
    width : 30px;
    background : rgba(255, 255, 255, 0.3);
    border: 3px solid white;
    border-radius: 10px;
    color:white;
    margin : 0 10px;
 }
`;


const PubCarousel = (props) => {

  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([])
  const [id_image, setId_image] = useState(null)

  //modals
  const [modalModifierPub, setModalModifierPub] = useState(false);
  const [modalSupprimerPub, setModalSupprimerPub] = useState(false);
  const [modalModifierSlogan, setModalModifierSlogan] = useState(false);
  
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const page_name = props.page
    axios.post(`${process.env.REACT_APP_API_URL}/get/image/pub`, {page_name})
    .then(res => { 
      setImages(res.data)
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
   }, []) 
    
    return(
        <React.Fragment>
            <Styles>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    {images.map((image) => 
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${process.env.REACT_APP_API_URL}/${image.image_pub_url}`}
                                alt={image.image_name}
                            />
                            <Carousel.Caption>
                                <button onClick = {()=>{setModalModifierPub(true); setId_image(image.id_image_pub)}} className='edit-button'>Modifier</button>
                                <button onClick = {()=>{setModalSupprimerPub(true); setId_image(image.id_image_pub)}} className='suppr-button'>Supprimer</button>
                                <h3 style={{marginTop:'20px'}}>Slide {image.id_image_pub}</h3>
                                <div className='slogan-container'>
                                    <p style={{paddingTop:'15px'}}>Modifier ou Supprimer ce slide</p>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )}
                </Carousel>
            </Styles>
            <ModifierPub
                show={modalModifierPub}
                onHide={() => setModalModifierPub(false)}
                id_image = {id_image}
            />
            <SupprimerPub
                show={modalSupprimerPub}
                onHide={() => setModalSupprimerPub(false)}
                id_image = {id_image}
            />
            <ModifierSlogan
                show={modalModifierSlogan}
                onHide={() => setModalModifierSlogan(false)}
            />
        </React.Fragment>
        
        
    )
}

export default PubCarousel;