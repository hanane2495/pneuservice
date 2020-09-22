import React from 'react';
import styled from 'styled-components';
import { Link} from 'react-router-dom';


//images 
import background from './assets/background1.jpg'

//components
import FooterPage from './Components/Footer';


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


function Login() {
    return (
      <React.Fragment>
        <Styles>
          <div className='background'>
            <div className='left-content'>
              <h3 className='Login'>Connexion</h3>
              <input className='Login-form' type='email' name='email' placeholder='Entrez votre email' style={{paddingLeft:'15px'}}/>
              <input className='Login-form' type='password' name='mot_de_passe' placeholder='Entrer votre mot de passe' style={{paddingLeft:'15px'}}/>
              <Link className='Login-link'> Mot de passe oublié ?</Link>
              <Link to='/Acceuil'><button className='Login-button'> Se connecter</button></Link>
            </div>
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