import React from "react";
import Link from 'react-router-dom';
import { Card, Form, Container } from "react-bootstrap";
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';


//icons
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import LocalSeeIcon from '@material-ui/icons/LocalSee';

//images 
import profile from './assets/profile1.jpg';

//components
import BadgeAvatars from './Components/ModifieAvatar'
    


const Styles = styled.div`
 height:100%;
  .profile-layout{
    display: grid;
    height:100%;
    grid-template-areas:
        'title-com'
        'table-com';
     grid-template-rows: 10% 90%;
     grid-template-columns: 100%;
     padding:1% 1% 0 2% ;
     transition:0.9s;
  }
  .titre-profile{
    grid-area: title-com;
    justify-content:center;
    justify-items:center;
    align-items:center;
    padding:0 1.5%;
    padding-left:0;
  }
  .profile{
    grid-area: table-com;
    justify-content:center;
    justify-items:center;
    align-items:center;
    padding: 1.5%;
    padding-left:0;

  }
  .card-profile1{
      display:flex;
      flex-direction: row;
      justify-content:left;
      height: 100%;
      width:100%;
      padding-left: 2%;
      padding-top:0.5%;
      border-radius:10px;
      box-shadow:5px 10px 20px 1px rgba(0, 0, 0, 0.153);
  }
  .card-profile{
    display: grid;
    height:100%;
    width:100%;
    grid-template-areas:
        'avatar   info     colonne2'
        'colonne1 colonne1 colonne2'
        'ligne ligne ligne';
     grid-template-rows: 40% 45% 15%;
     grid-template-columns: 25% 25% 50%;
     padding:1% 1% 1% 2% ;
     transition:0.9s;
     justify-content:center;
     border-radius:10px;
     box-shadow:5px 10px 20px 1px rgba(0, 0, 0, 0.153);
  }
  .avatar{
    grid-area:avatar;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-items:center;
  }
  .info{
    grid-area:info;
    display:flex;
    flex-direction:column;
    align-items:left;
    justify-items:center;
    padding-top:3%;
  }
  .colonne1{
      grid-area:colonne1;
      display:flex;
      flex-direction:column;
      justify-items:center;
      align-items:left;
      padding:2%;
      margin-top:8.7%;
  }
  .colonne2{
      grid-area:colonne2;
      display:flex;
      flex-direction:column;
      justify-items:center;
      align-items:left;
      padding:2%;
  }
  .ligne{
      grid-area:ligne;
      display:flex;
      flex-direction:row;
      justify-content:flex-end;
      align-items:center;
  }
  .nom-prenom{
    display:flex;
    flex-direction:row;
    margin:1.5% 0;
  }
  .form-profile{
      margin: 1% 2% 2% 0;

  }
`;


const Profile = () => {

    return(
        <React.Fragment>
            <Styles>
            <div className='profile-layout'>
                <div className='titre-profile'>
                    <Card className='card-profile1'>
                        <p style={{fontSize:'1.2rem', fontWeight:'500', color:'#999', marginTop:'0.5%'}}>Mon Profile</p>
                    </Card>
                </div>
                <div className='profile'>
                    <Card className='card-profile'>
                           <div className='avatar'>
                                     <BadgeAvatars/>
                            </div>
                            <div className='info'>
                                <h4 style={{color:'#777'}}>Mon Profile</h4>
                                <h6>Djelloul Boubekri</h6>
                                <h6>Managing Director</h6>
                                <h6>djelloul.boubekri@gmail.com</h6>
                                <h6>+213.560.66.99.99</h6>
                            </div>
                            <div className='colonne1'>
                                <h6 style={{color:'#777'}}>Identifiant de connexion</h6>
                                <Form.Control className='form-profile' type="password" placeholder="Nouveau Mot de passe" />
                                <Form.Control className='form-profile' type="password" placeholder="Confirmer Nouveau Mot de passe" />
                            </div>
                            <div className='colonne2'>
                                <h6 style={{color:'#777'}}>Coordonnées</h6>
                                <div className='nom-prenom'>
                                    <Form.Control style={{marginRight:'0.4rem'}} type="text" placeholder="Boubekri *" />
                                    <Form.Control className='form-nom-prenom' type="text" placeholder="Djelloul *" />
                                </div>
                                <Form.Control className='form-profile' type="text" placeholder="Managing Director *" />
                                <Form.Control className='form-profile' type="email" placeholder="djelloul.boubekri@gmail.com *" />
                                <Form.Control className='form-profile' type="text" placeholder="Adresse" />
                                <Form.Control className='form-profile' type="text" placeholder="+213.560.66.99.99" />
                                <Form.Control className='form-profile' type="text" placeholder="Mobile 2" />
                            </div>
                        <div className='ligne'>
                            <button type='submit' style={{color:'#fff', background:'#0B9ED9', border:'none', width:'7rem', height:'2.5rem', margin:'0.8rem 0.5rem 0 0.5rem', borderRadius:'0.5rem'}}>Sauvegarder</button>
                            <button type='submit' style={{color:'#fff', background:'#aaa', border:'none', width:'5rem', height:'2.5rem', margin:'0.8rem 0.5rem 0 0.5rem', borderRadius:'0.5rem'}}>Annuler</button>
                        </div>
                       
                    </Card>
                </div>        
            </div>
            </Styles>
        </React.Fragment>
        
        
    )
}

export default Profile;