import React, {useState} from 'react';
import axios from 'axios'
import styled from 'styled-components';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import {Authenticate} from '../helpers/auth'


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

toast.configure();
function ForgetPassword() {
    const [formData, setFormData] = useState({
        email: '',
        textChange: 'Envoyer'
      });
      const { email, textChange } = formData;
      const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
      };
      //submit data to backend
      const handleSubmit = e => {
        e.preventDefault();
        if (email) {
          setFormData({ ...formData, textChange: 'Envoie...' });
          axios
            .put(`${process.env.REACT_APP_API_URL}/password/forget`, {
              email
            })
            .then(res => {
              console.log(res.data)
              Authenticate(res, () => {
                setFormData({
                  ...formData,
                  email: '',
                  textChange : 'Envoyé 🗸'
                });
                  toast.success(`Merci de consulter vos emails`);
              });
            })
            .catch(err => {
              toast.error(err.response.data.errors);
            });
        } 
      };



    return (
      <React.Fragment>
        <Styles>
          <ToastContainer style={{fontSize:'0.5em'}} />
          <div className='background'>
            <form className='left-content' onSubmit={handleSubmit}>
              <h3 className='Login'>Mot de passe oublié !</h3>
              <input className='Login-form' type='email' name='email' placeholder='Entrez votre email' style={{paddingLeft:'15px'}} onChange={handleChange('email')} value={email}/>
              <button type='submit'  className='Login-button'>{textChange}</button>
            </form>
            <div className='Right-content'>
              <h3 style={{paddingLeft:'10vh', paddingRight:'10vh',paddingBottom:'3vh'}}>Mot de passe oublié ?</h3>
              <p style={{paddingLeft:'10vh', paddingRight:'10vh'}}>
                Entrer votre adresse email d'inscription <br/>
                et vous allez recevoir un email contenant un lien. <br/>
                Cliquez sur ce lien pour changer votre mot de passe <br/>
              </p>
            </div>
          </div>
          <FooterPage/>
        </Styles>
      </React.Fragment>
    );
  }
  
  export default ForgetPassword;
