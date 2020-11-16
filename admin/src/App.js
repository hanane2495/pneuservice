import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import styled from 'styled-components';

import './App.css';


//icon
import { FaHome, FaShoppingCart, FaTruck, FaBullhorn } from 'react-icons/fa';
import { GiCarWheel, GiAutoRepair } from "react-icons/gi";
import {MdLocalOffer} from 'react-icons/md'


//components
import Login from './screens/Login';
import Acceuil from './screens/Acceuil'
import Commande from './screens/Commande'
import Fournisseurs from './screens/Fournisseurs'
import CentreMontage from './screens/CentreMontage'
import Pneus from './screens/Pneus'
import Promo from './screens/Promo'
import Product from './screens/Product'
import Stock from './screens/Stock'
import Navbar from './Components/Navbar'
import Aside from './Components/Aside'
import Profile from './screens/Profile'
import AddUser from './screens/AddUser'
import ForgetPassword from './screens/ForgetPassword'
import ResetPassword from './screens/ResetPassword'
import NotFound from './screens/NotFound'
import Publicite from './screens/Publicite'

//Private Routes
import PrivateRoute from './routes/PrivateRoute';

//styled components 
const Styles =styled.div`
  .toggle-grid-layout{
    height: 100vh;
    display: grid;
    grid-template-areas:
      'asideLeft nav'
      'asideLeft main';
    grid-template-rows: 15% 85%;
    grid-template-columns: 18% 82%;
    transition:  0.9s ;
    -moz-transition:  0.9s ; /* Firefox 4 */
    -webkit-transition:  0.9s ; /* Safari 和 Chrome */
    -o-transition:  0.9s ; /* Opera */
    background:#fff;
  }
  .grid-layout{
      height: 100vh;
      display: grid;
      justify-self:center;
      grid-template-areas:
        'asideLeft nav nav'
        'asideLeft main asideRight';
     grid-template-rows: 15% 85%;
     grid-template-columns: 5% 95%;
     transition:  0.9s ;
    -moz-transition:  0.9s ; /* Firefox 4 */
    -webkit-transition: 0.9s ; /* Safari 和 Chrome */
    -o-transition: 0.9s ; /* Opera */
     background:#fff;
     }
     
`;

const Nav = styled.nav`
  grid-area: nav;
  justify-content:center;
`;
const AsideLeft = styled.aside`
  grid-area: asideLeft;
  
`;
const Main = styled.main`
  grid-area: main;
  height:100%;
`;



function App() {
  const [toggled, setToggled] = useState(false);

  const[user, setUser] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  },[]);

  return (
    <Router>
        <Switch>
          <Route exact path='/' component={props => <Login setUser={setUser}/>}/>
          <Route  path='/mot-de-passe/oublie' component={props => <ForgetPassword />}/>
          <Route  path='/users/password/reset/:token' component={props => <ResetPassword {...props}/>}/>
          <Route render={({ location, history }) => (
           <React.Fragment >
             <Styles >
               <div id='Mygrid' className='grid-layout'>
                   <AsideLeft>
                      <SideNav
                            onSelect={(selected) => {
                                const to = '/' + selected;
                                if (location.pathname !== to) {
                                    history.push(to);
                                }
                            }}
                          >
                          <SideNav.Toggle onClick={() => { 
                                                            console.log('toggle clicked'); 
                                                            setToggled(!toggled)
                                                            const Mygrid = document.getElementById('Mygrid');
                                                            console.log(Mygrid.className)
                                                            
                                                            if(Mygrid.className ==='grid-layout' ){
                                                              Mygrid.classList.replace('grid-layout','toggle-grid-layout');
                                                              console.log(Mygrid.className)
                                                            }else{
                                                              Mygrid.classList.replace('toggle-grid-layout' ,'grid-layout');
                                                              console.log(Mygrid.className)
                                                            }
                                                          }}
                          />
                          <SideNav.Nav defaultSelected="Acceuil">
                              <NavItem eventKey="Acceuil">
                                  <NavIcon>
                                      <FaHome style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                      Home
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="Commandes">
                                  <NavIcon>
                                      <FaShoppingCart style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Commandes
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="Fournisseurs">
                                  <NavIcon>
                                      <FaTruck style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Fournisseurs
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="Centres_de_montages">
                                  <NavIcon>
                                      <GiAutoRepair style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Centre de Montage
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="Pneus">
                                  <NavIcon>
                                      <GiCarWheel style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Pneus
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="Promo">
                                  <NavIcon>
                                      <MdLocalOffer style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Promo
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="Publicite">
                                  <NavIcon>
                                      <FaBullhorn style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Pub
                                  </NavText>
                              </NavItem>
                              
                          </SideNav.Nav>
                      </SideNav>
                   </AsideLeft>
                   <Nav>
                      <Navbar user={user} setUser={setUser}/>
                   </Nav>
                   <Main>
                      <main style={{height:'100%'}}>
                          <PrivateRoute  path='/Acceuil'  component={props => <Acceuil closed={toggled}/>}/>
                          <PrivateRoute  path='/Commandes'  component={props =><Commande />}/>
                          <PrivateRoute  path='/Fournisseurs'  component={props =><Fournisseurs />}/>
                          <PrivateRoute  path='/Centres_de_montages'  component={props =><CentreMontage />}/>
                          <PrivateRoute  path='/Pneus'  component={props =><Pneus />}/>
                          <PrivateRoute  path='/Promo'  component={props =><Promo />}/>
                          <PrivateRoute  path='/Product'  component={props =><Product />}/>
                          <PrivateRoute  path='/Stock'  component={props =><Stock />}/>
                          <PrivateRoute  path='/Profile'  component={props =><Profile />}/>
                          <PrivateRoute  path='/Ajouter_Utilisateur'  component={props =><AddUser />}/>
                          <PrivateRoute  path='/Publicite'  component={props =><Publicite />}/>

                      </main> 
                   </Main>
              </div>     
          </Styles>
        </React.Fragment>
    )}
    />
        </Switch>
    </Router>
  );
}

export default App;


/**
 *<Route component={props => <NotFound/>}/>

 * 
 * .sidenav---collapsed---LQDEv {
    transition: min-width 0.9s;
}

<div className='div-aside'>
                      <Aside />
                   </div> 

                   .div-aside{
    grid-area:'aside';
    background:blue;

  }


  const Styles = styled.div`
  .app-body{
    height: 100vh;
    width:100vw;
    margin:0;
    display:grid;
    grid-template-rows: 1fr 6fr;
    grid-template-columns: 1fr 20fr;
    grid-template-areas:
      "sidebar navbar"
      "sidebar main";
  }
  .sidebar-div{
    background:blue;
    grid-area:'sidebar';
  }
  .div-navbar{
    background:red;
    grid-area:'navbar';
  }
  .new-main{
    grid-area:'main';
    width: auto;
    margin-left:250px;
    transition:0.9s;
  }
  .old-main{
    background:grey;
    grid-area:'main';
    transition:0.9s
  }
  
  
`;
 */