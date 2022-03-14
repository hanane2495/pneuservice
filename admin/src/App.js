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
import { FaHome, FaShoppingCart, FaTruck, FaCodeBranch, FaPager } from 'react-icons/fa';
import { GiCarWheel, GiAutoRepair } from "react-icons/gi";
import {MdLocalOffer, MdStore} from 'react-icons/md'
import {FiLayers} from 'react-icons/fi'
import {BsFillBootstrapFill} from 'react-icons/bs'


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
import Marques from './screens/Marques'
import Collections from './screens/Collections'
import Mapping from './screens/Mapping'

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

    @media (min-width: 2560px) {
      grid-template-rows: 5% 95%;
      grid-template-columns: 8% 92%;
    }
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

     @media (min-width: 2560px) {
      grid-template-rows: 5% 95%;
      grid-template-columns: 3% 97%;
     }
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
                          <SideNav.Nav defaultSelected="acceuil">
                              <NavItem eventKey="acceuil">
                                  <NavIcon>
                                      <FaHome style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                      Home
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="commandes">
                                  <NavIcon>
                                      <FaShoppingCart style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Commandes
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="fournisseurs">
                                  <NavIcon>
                                      <FaTruck style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Fournisseurs
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="stock">
                                  <NavIcon>
                                      <MdStore style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Stocks
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="mapping">
                                  <NavIcon>
                                      <FaCodeBranch style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Mappings
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="pneus">
                                  <NavIcon>
                                      <GiCarWheel style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Pneus
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="collections">
                                  <NavIcon>
                                      <FiLayers style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                     Collections
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="marques">
                                  <NavIcon>
                                      <BsFillBootstrapFill style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                     Marques
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="promo">
                                  <NavIcon>
                                      <MdLocalOffer style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Promo
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="centres_de_montages">
                                  <NavIcon>
                                      <GiAutoRepair style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Centre de Montage
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="pages">
                                  <NavIcon>
                                      <FaPager style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Pages
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
                          <PrivateRoute  path='/acceuil'  component={props => <Acceuil closed={toggled}/>}/>
                          <PrivateRoute  path='/commandes'  component={props =><Commande />}/>
                          <PrivateRoute  path='/fournisseurs'  component={props =><Fournisseurs />}/>
                          <PrivateRoute  path='/centres_de_montages'  component={props =><CentreMontage />}/>
                          <PrivateRoute  path='/pneus'  component={props =><Pneus />}/>
                          <PrivateRoute  path='/promo'  component={props =><Promo />}/>
                          <PrivateRoute  path='/product'  component={props =><Product />}/>
                          <PrivateRoute  path='/stock'  component={props =><Stock />}/>
                          <PrivateRoute  path='/mapping'  component={props =><Mapping />}/>
                          <PrivateRoute  path='/profile'  component={props =><Profile />}/>
                          <PrivateRoute  path='/ajouter_Utilisateur'  component={props =><AddUser />}/>
                          <PrivateRoute  path='/pages'  component={props =><Publicite />}/>
                          <PrivateRoute  path='/collections'  component={props =><Collections />}/>
                          <PrivateRoute  path='/marques'  component={props =><Marques />}/>

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
 * <NavItem eventKey="stock">
                                  <NavIcon>
                                      <MdStore style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Stocks
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="mapping">
                                  <NavIcon>
                                      <FaCodeBranch style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Mappings
                                  </NavText>
                              </NavItem>
 */