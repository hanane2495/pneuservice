import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { MDBContainer, MDBFooter } from "mdbreact";
import styled from 'styled-components';

//icons 
import { FaFacebookF, FaPhone, FaTwitter } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

//logo
import logo from '../assets/logo-orange.png'


const Styles = styled.div`
   .font-small{
    background:#262626;
    background-size:cover;
     color:white;
   }
   .footer-copyright{
    background: #262626 ;
    background-size:cover;
     color : white;
     border-top : solid;
     margin-top: 2%;
   }
   .footer-row{
     display:flex;
     flex-direction:row;
     justify-content:center;
     align-items:flex-start;
     padding: 0 2%;
     @media only screen and (max-width: 790px) {
       flex-direction:column;
       justify-content:center;
     }
     
   }
   .footer-column{
     display:flex;
     flex-direction:column;
     justify-content:flex-start;
     align-items:flex-start;
     font-size:18px;
     width:27%;
     @media only screen and (max-width: 790px) {
           font-size:20px;
           width:100%;
           align-items:center;
           margin-bottom:10%;
     }
     @media only screen and (max-width: 450px) {
           font-size:18px
     }
   }

   .title{
     font-size:1.2em;
     color:#FB3C29;
     /*font-family: 'Teko', sans-serif;*/  
    }

   .list-unstyled, a {
     color:white;
     font-size:0.7em;
     text-decoration:none;
     /*font-family: 'MuseoModerno', cursive;*/
     &:hover{
       color:#cd4339;
     }
   }

   .icon-section{
    width:100%;
    display:flex; 
    flex-direction:row;
    @media only screen and (max-width: 790px) {
       justify-content:center;
     }
   }

   .Style-icon{
      width:0.5em;
      height:0.5em;
      margin-right:2%;
      &:hover{
        color:#cd4339;
      }
      @media only screen and (max-width: 450px) {
        width:1em;
      height:1em;
     }
   }

   .description{
     font-size:0.7em;
     /*font-family: 'MuseoModerno', cursive;*/
     @media only screen and (max-width: 790px) {
           text-align:center;
     }
   }

   .contact-input{
     background: #333;
     color:white;
     border:none;
     border-bottom: solid white;
     width: 100%;
     margin-bottom:2%;
     font-size:0.6em;
   }

   .bouton-contact{
     background:#4d8abc;
     color:whitesmoke;
     border:none;
     font-size:0.5em;
     font-weight:700;
     width:30%;
     height:12%;
     border-radius:5px;
     &:hover{
       color:#cd4339;
     }
   }

   .logo-footer{
     width:200px;
     height:100px;
   }
`;


const Footer = () => {
  
  return (
    <Styles>
    <MDBFooter color="blue" className="font-small pt-4 ">
        <div className='footer-row'>
          <div className='footer-column'>
            <img
              src={logo}
              className="d-inline-block align-top logo-footer"
              alt="Pneuservice.dz"
            />
              <p className="list-unstyled">
              Les plus grandes marques disponibles
              </p>
              <p className="list-unstyled">
              Des centres de montage agrées 
              </p>
              <p className="list-unstyled">
              Des milliers de références 
              </p>
              <p className="list-unstyled">
              Les meilleurs prix du marché
              </p>
              <p className="list-unstyled">
              Du temps gagné dans votre recherche
              </p>
            
          </div>
          <div className='footer-column'>
            <p className="title">Changer vos pneu plus facilement</p>
              <p className="list-unstyled">
              1. Recherchez la dimension de votre pneu
              </p>
              <p className="list-unstyled">
              2. choisissez la marque et le nombre de pneu 
              </p>
              <p className="list-unstyled">
              3. faites votre commande.
              </p>
              <p className="list-unstyled">
              4. Payez à la livraison ou au centre de montage agrée.
              </p>
          </div>
          <div className='footer-column'>
            <p className="title">Nous Contacter</p>
            <p className='description'>Pour toutes informations complémentaires, veuillez contacter notre service commercial</p>
            <p className='description'><FaPhone style={{ height: '20px', width:'20px',  color:'#FB3C29'}}/> 0560 66 99 99</p>
            <p className='description'><MdMail style={{ height: '20px', width:'20px',  color:'#FB3C29'}}/> contact@pneuservice.dz</p>
            <p className='description'><FaFacebookF style={{ height: '20px', width:'20px', color:'#FB3C29'}}/> facebook.com/Pneuservice.dz</p>
          </div>
        </div>
        <div>

        </div>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.monsterstudio.org/"> Monster studio </a>
        </MDBContainer>
      </div>
    </MDBFooter>
    </Styles>
  );
}

export default Footer;