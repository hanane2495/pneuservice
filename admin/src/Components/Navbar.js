import React, {useEffect} from "react";
import { Link, useHistory} from 'react-router-dom';
import {Navbar, Nav, Container} from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

import {toast, ToastContainer} from 'react-toastify'


import {signout, isAuth} from '../helpers/auth'

//components
import ModalProfile from './ModalProfile'
import ModalAddUser from './ModalAddUser'

//icons
import { AiOutlineLogout } from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import { MdAdd } from 'react-icons/md';
import { FiPower } from 'react-icons/fi'


//images
import profile from '../assets/profile1.jpg'
import logo from '../assets/PneuS-03.png'

const Styles = styled.div`
    .navbar-layout{
        width:97%;
        height: 65px;
        background:#fff;
        border-radius:50px;
        margin-top:1%;
        margin-left:1.5%;
        transition:0.9s;
        box-shadow:5px 10px 20px 1px rgba(0, 0, 0, 0.1);

    }
    .search-input{
        border-radius:50px 10px  10px 50px;
        border-color:#db3d44;
        height: 100%;
        width:90%;
        padding-left:5px;
    }
    .search-button{
        border-radius:10px 50px  50px 10px;
        border:none;
        background:#db3d44;
        color:white;
        margin-left:3%;
        margin-bottom:0.5%;
    }
    .search-section{
        width: 50%;
        height:35px;
        display:flex;
        flex-direction:row;
        background:#db3d44;
        border-radius:50px;
        margin-left:15%;
    }
    .right-nav{
      margin-left:50vmin;
      margin-top:0.3%
    }
`;

const MyNavbar = (props) => {
  let history = useHistory();
  return (
    <React.Fragment>
      <ToastContainer/>
      <Styles>
        <Navbar className='navbar-layout'>
          <Container>
            <Navbar.Brand >
            <img
              src={logo}
              width="100"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              style={{marginRight:'10%'}}
            />
            </Navbar.Brand>
            <Nav className="right-nav">
            <Nav.Link >
                <Link to ='/Profile'>
                    <Avatar alt="Djelloul Boubekri" src={profile} style={{marginLeft:'0.7rem'}}/>
                </Link>
              </Nav.Link>
              <Nav.Link >
                <Link to ='/Profile'>
                   <p style={{color:'#555', marginLeft:'0.2rem', marginTop:'10%'}}>{isAuth().nom+" "+isAuth().prenom}</p>
                </Link>
              </Nav.Link>
              <Nav.Link >
                <FiPower 
                onClick={() => {
                  signout(() => {
                      props.setUser(null)
                      toast.error('Signout Successfully');
                      history.push('/');
                  });
              }}
                style={{color:'#db3d44', width:'1.5rem',  height:'1.5rem', marginLeft:'0.2rem', marginTop:'30%'}}/>
              </Nav.Link>
              <Nav.Link >
                <Link to='/'>
                  <p style={{color:'#555', marginLeft:'0.2rem', marginTop:'10%'}}
                   onClick={() => {
                    signout(() => {
                        props.setUser(null)
                        toast.error('Signout Successfully');
                        history.push('/');
                    });
                }}
                  >Déconnexion</p>
                </Link>
              </Nav.Link>
           </Nav>
          </Container> 
        </Navbar>
      </Styles>
    </React.Fragment>
  )}


export default MyNavbar;



/**
 * //icons
import { GoSearch } from "react-icons/go";
import { MdMailOutline, MdNotificationsNone } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";





                    <div className="md-form my-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Rechercher..." aria-label="Search" />
                    <button className='search-button'><GoSearch style={{ width:'1.2rem',  height:'1.2rem'}}/>
</button>
                    </div>
 */