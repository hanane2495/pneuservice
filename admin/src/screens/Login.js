import React, {useState} from 'react';
import axios from 'axios'
import styled from 'styled-components';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useHistory} from 'react-router-dom';

import {Authenticate, isAuth} from '../helpers/auth'


//images 
import background from '../assets/background1.jpg'

//components
import FooterPage from '../Components/Footer';


const Styles = styled.div`
.background{
  background: -webkit-linear-gradient( rgba(44, 43, 43, 0.7) 100%,transparent 100%), url(${background});
  background-size:cover;
  background-position:center;
  height:100vh;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-content:center;
}
.left-content{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-content:center;

  background:-webkit-linear-gradient( rgba(255, 255, 255, 0.8) 100%,transparent 100%);

  margin-top:100px;
  margin-bottom:100px;
  padding-left:50px;
  padding-right:50px;
}
.Right-content{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-content:center;
  color:white;

  background:-webkit-linear-gradient( rgba(150, 43, 43, 0.5) 100%,transparent 100%);

  margin-top:100px;
  margin-bottom:100px;

}

.Login{
  padding-bottom:30px;
  color:#666;
  font-size:36px;
  font-weight:bold;
  border-bottom: black;
  &:after{
        content:"";
          background: rgba(150, 43, 43, 0.8);
          display:block;
          height:1px;
          width:59vh;
          margin: 8px 5px; 
          
        }
}

.Login-form{
  padding-top:10px;
  padding-bottom:20px;
  margin-bottom:20px;
  width:60vh;
  border:none;
  border-radius:5px;
}

.Login-link{
  margin-bottom:20px;
  color:#333;
}

.Login-button{
  margin-bottom:20px;
  height:7vh;
  width:30vh;
  background:rgba(190, 43, 43);
  border:none;
  border-radius:5px;
  color:white;
  font-weight:bold;
}
.site-link{
  padding: 10px auto 10px;
  margin-bottom:20px;
  margin-left:10vh;
  height:6vh;
  width:25vh;
  border: 2px solid white;
  border-radius:20px;
  text-align:center;
  color:white;
  font-size:16px;
  font-weight:400;
}

`;


function Login(props) {
  let history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  //handle chages 
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  //submit data to backend
  const handleSubmit = e => {
    e.preventDefault();
    if (email && password) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password
        })
        .then(res => {
          Authenticate(res, () => {
            setFormData({
              ...formData,
              email: '',
              password: '',
            });    
            if(isAuth()){
              history.push('/Acceuil');
              props.setUser(JSON.parse(localStorage.getItem('user')))
              toast.success(`Salut ${res.data.user.prenom}, bienvenue à nouveau !`);
            } 
          });
        })
        .catch(err => {
          console.log(err.response);
          toast.error(err.response.data.error);
        });
    } else {
      toast.error('Merci de compléter tous les champs');
    }
  };



    return (
      <React.Fragment>
        <Styles>
          <ToastContainer style={{fontSize:'0.8em'}} />
          <div className='background'>
            <form className='left-content' onSubmit={handleSubmit}>
              <h3 className='Login'>Connexion</h3>
              <input className='Login-form' type='email' name='email' placeholder='Entrez votre email' style={{paddingLeft:'15px'}} onChange={handleChange('email')} value={email}/>
              <input className='Login-form' type='password' name='mot_de_passe' placeholder='Entrer votre mot de passe' style={{paddingLeft:'15px'}} onChange={handleChange('password')} value={password}/>
              <Link to = '/mot-de-passe/oublie' className='Login-link'> Mot de passe oublié ?</Link>
              <button type='submit'  className='Login-button'> Se connecter</button>
            </form>
            <div className='Right-content'>
              <h3 style={{paddingLeft:'10vh', paddingRight:'10vh',paddingBottom:'3vh'}}>Pneu Service</h3>
              <p style={{paddingLeft:'10vh', paddingRight:'10vh'}}>
                Connecter-vous sur le panneau de controle <br/>
                pour gérer le contenu de votre site internet. <br/>
                Vous pouvez égalemet accéder à votre site <br/> en cliquant sur le bouton ci-dessous:
              </p>
              <Link className='site-link'> Pneu Service</Link>
            </div>
          </div>
          <FooterPage/>
        </Styles>
      </React.Fragment>
    );
  }
  
  export default Login;

  /**
   * rgba(190, 43, 43);
   */