import React, { useState } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import styled from 'styled-components';

import './App.css';


//icon
import { FaHome, FaShoppingCart, FaTruck, FaBullhorn } from 'react-icons/fa';
import { GiCarWheel, GiAutoRepair } from "react-icons/gi";


//components
import Login from './Login';
import Acceuil from './Acceuil'
import Commande from './Commande'
import Fournisseurs from './Fournisseurs'
import CentreMontage from './CentreMontage'
import Pneus from './Pneus'
import Publicite from './Publicite'
import Product from './Product'
import Stock from './Stock'
import Navbar from './Components/Navbar'
import Aside from './Components/Aside'
import Profile from './Profile'
import AddUser from './AddUser'

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

  return (
    <Router basename='/'>
        <Switch>
          <Route exact path='/' component={Login}/>
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
                              <NavItem eventKey="Publicite">
                                  <NavIcon>
                                      <FaBullhorn style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                    Publicité
                                  </NavText>
                              </NavItem>
                              
                          </SideNav.Nav>
                      </SideNav>
                   </AsideLeft>
                   <Nav>
                      <Navbar/>
                   </Nav>
                   <Main>
                      <main style={{height:'100%'}}>
                          <Route  path='/Acceuil' component={props => <Acceuil closed={toggled}/>}/>
                          <Route  path='/Commandes' component={props =><Commande />}/>
                          <Route  path='/Fournisseurs' component={props =><Fournisseurs />}/>
                          <Route  path='/Centres_de_montages' component={props =><CentreMontage />}/>
                          <Route  path='/Pneus' component={props =><Pneus />}/>
                          <Route  path='/Publicite' component={props =><Publicite />}/>
                          <Route  path='/Publicite' component={props =><Publicite />}/>
                          <Route  path='/Product' component={props =><Product />}/>
                          <Route  path='/Stock' component={props =><Stock />}/>
                          <Route  path='/Profile' component={props =><Profile />}/>
                          <Route  path='/Ajouter_Utilisateur' component={props =><AddUser />}/>
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