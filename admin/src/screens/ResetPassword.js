import React, {useState, useEffect} from 'react';
import axios from 'axios'
import styled from 'styled-components';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link} from 'react-router-dom';
import {Spinner} from 'react-bootstrap'




//images 
import background from '../assets/background1.jpg'

//components
import FooterPage from '../Components/Footer';

//icons
import {FiCheckCircle} from 'react-icons/fi'


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
  padding : 10px 0 20px 10px;
  margin-bottom:20px;
  width:60vh;
  border:none;
  border-radius:5px;
}

.Login-link{
  margin-bottom:20px;
  color:#fff;
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
function ResetPassword({match}) {
    const [formData, setFormData] = useState({
        password : '',
        password1 : '',
        token : '',
        textChange: 'Envoyer'
      })
    
      const { password, password1, token, textChange} = formData
      useEffect(() => {
        let token = match.params.token
        if(token) {
            setFormData({...formData, token,})
        }
        
      }, [])
    
      function getTextChange(){
        switch(textChange){
          case 'Reinitialisation..': 
            return(
              <div style={{display:'flex', flexDirection:'row'}}>
                <Spinner animation="border" style={{margin:'0 2%', color:'#fff'}} />
                <p style={{fontSize:'0.5em', color:'#fff', marginBottom:'1.5%'}}>
                Reinitialisation...
                </p>
              </div>
            );
          case 'Reinitialisé 🗸': 
            return(
                <p style={{fontSize:'0.8em', color:'#333', marginBottom:'1.5%', textAlign:'center'}}> 
                  Maintenant vous pouvez vous connecter avec votre nouveau mot de passe <br/>
                <Link className = "Login-link" to="/">allez à la page de connexion!</Link>
                </p>
            ); 
          // .. etc
          default:
          return null
        }
      }
    
      const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
      };
    
      const handleSubmit = e =>{
        e.preventDefault();
        if ((password === password1) && password && password1){
          setFormData({ ...formData, textChange: 'Reinitialisation..' });
    
          axios
            .put(`${process.env.REACT_APP_API_URL}/password/reset`, {
                newPassword: password,
                resetpasswordlink: token
            }).then(res => {
              setFormData({
                ...formData,
                password: '',
                password1: '',
                textChange: 'Reinitialisé 🗸'
                  
              });
              toast.success(res.data.message);
            }).catch(err => {
              setFormData({ ...formData, textChange: 'Reinitialiser' });
              toast.error('Quelque chose s\'est mal passé, veuillez reéssayer à nouveau');
            })
        }else{
          toast.error('mot de passe inapproprié');
        }
      }
    return (
      <React.Fragment>
        <Styles>
          <ToastContainer style={{fontSize:'0.8em'}} />
          <div className='background'>
            <form className='left-content' onSubmit={handleSubmit}>
              <h3 className='Login'>Nouveau mot de passe</h3>
              <input name='password' type='password' placeholder='Your new password' className='Login-form' value={password} onChange={handleChange('password')}/>
              <input name='password1' type='password' placeholder='Confirm your new password' className='Login-form' value={password1} onChange={handleChange('password1')}/>
              { getTextChange()}
              <button type='submit'  className='Login-button'>{textChange}</button>
            </form>
            <div className='Right-content'>
              <h3 style={{paddingLeft:'10vh', paddingRight:'10vh',paddingBottom:'3vh'}}>Reinitialisation mot de passe !</h3>
              <p style={{paddingLeft:'10vh', paddingRight:'10vh'}}>
              Vous êtes sur le point de réinitialiser votre mot de passe.<br/>
              <Link to='/' className='Login-link'>Retournez à la page de connexion !</Link>
              </p>
            </div>
          </div>
          <FooterPage/>
        </Styles>
      </React.Fragment>
    );
  }
  
  export default ResetPassword;
