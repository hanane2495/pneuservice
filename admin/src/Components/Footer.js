import React from "react";
import { Link } from 'react-router-dom';
import {  MDBContainer, MDBFooter} from "mdbreact";
import styled from 'styled-components';


//icons 
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";


const Styles = styled.div`
   .font-small{
     background:#333;
     color:white;
   }
   .footer-copyright{
     color : white;
     border-top : solid;
     margin-top: 10px;
   }
   
   .list-unstyled, a {
     color:white;
     font-size:18px;
     text-decoration:none;
     padding-top:20px;

     &:hover{
       color:#cd4339;
     }
   }
   .Style-icon{
      width:30px;
      height:30px;
      margin: 10px;
      &:hover{
        color:#cd4339;
      }
   }
   
`;


const FooterPage = () => {
  return (
    <Styles>
    <MDBFooter color="none" className="font-small pt-4 ">
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.monsterstudio.org/"> Monster studio </a>
        </MDBContainer>
        <MDBContainer>
          <FaFacebookF className='Style-icon'/>
          <FaInstagram className='Style-icon' />
          <FaLinkedin className='Style-icon'/>
          <FaTwitter className='Style-icon'/>
        </MDBContainer>
      </div>

    </MDBFooter>
    </Styles>
  );
}

export default FooterPage;