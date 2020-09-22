import React from "react";
import { Link } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import styled from 'styled-components';

//icons 
import { FaHome, FaShoppingCart, FaTruck, FaBullhorn } from 'react-icons/fa';
import { GiCarWheel } from "react-icons/gi";
import { GiAutoRepair } from "react-icons/gi";
import { AiOutlineLogout } from "react-icons/ai";


const Styles = styled.div`
.selected{
    background:rgb(0,0,0, 0.5);
}
`;

const Sidebar = () => {
    return (
        <React.Fragment>
            <Styles>
            <SideNav 
                >
                  <SideNav.Toggle />
                  <SideNav.Nav>
                      <NavItem id='home' eventKey="Acceuil" >
                          <NavIcon>
                          <Link to='/Acceuil'>
                                <FaHome style={{ fontSize: '1.75em' }} />
                                </Link>    
                          </NavIcon>
                          <NavText>
                              Acceuil
                          </NavText>
                      </NavItem>
                     
                      <NavItem eventKey="Commandes">
                          <NavIcon>
                              <Link to='/Commandes'>
                                    <FaShoppingCart style={{ fontSize: '1.75em' }} />
                              </Link>
                          </NavIcon>
                          <NavText>
                              Commandes
                          </NavText>
                      </NavItem>
                      <NavItem eventKey="Fournisseurs">
                          <NavIcon>
                              <Link to='Fournisseurs'>
                                    <FaTruck style={{ fontSize: '1.75em' }} />
                              </Link>
                          </NavIcon>
                          <NavText>
                                Fournisseurs
                          </NavText>
                      </NavItem>
                      <NavItem eventKey="Centres_de_montages">
                          <NavIcon>
                            <Link to='Centres_de_montages'>
                                <GiAutoRepair style={{ fontSize: '1.75em' }} />
                            </Link>
                          </NavIcon>
                          <NavText>
                                Centres de montages
                          </NavText>
                      </NavItem>
                      <NavItem eventKey="Pneus">
                          <NavIcon>
                                <Link to='Pneus'>
                                        <GiCarWheel style={{ fontSize: '1.75em' }} />
                                </Link>
                          </NavIcon>
                          <NavText>
                                Pneus
                          </NavText>
                      </NavItem>
                      <NavItem eventKey="Publicite">
                          <NavIcon>
                          <Link to='Publicite'>
                                <FaBullhorn style={{ fontSize: '1.75em' }} />
                          </Link>
                          </NavIcon>
                          <NavText>
                                Publicite
                          </NavText>
                      </NavItem>
                  </SideNav.Nav>
                  <SideNav.Nav>
                  <NavItem eventKey="Publicite" style={{  marginTop:'8em' }}>
                          <NavIcon>
                          <Link to='Publicite'>
                                <AiOutlineLogout style={{ fontSize: '1.75em' }} />
                          </Link>
                          </NavIcon>
                          <NavText>
                                Déconnexion
                          </NavText>
                      </NavItem>
                  </SideNav.Nav>
              </SideNav>
              </Styles>
        </React.Fragment>
    )
}

export default Sidebar;

/**
 * 
 * 
 * <p className='link-text'>Analytics</p>
 * <p className='link-text'>Commandes</p>
 * <p className='link-text'>Fournisseurs</p>
 * <p className='link-text'>C.Montages</p>
 * <p className='link-text'>Pneus</p>
 * <p className='link-text'>Publicité</p>
 * 
 * 
 * 
 * 
 * <Styles>
                <div className='Sidebar'>
                    <Nav defaultActiveKey="/Dashboard" className="flex-column sidebar-content">
                       <Link to='/Dashboard' className='navigation'>
                            <GiHamburgerMenu on className='hamburger'/>
                       </Link>
                       <Link to='/Dashboard' className='navigation'>
                            <OverlayTrigger placement='right' overlay={<Tooltip id="tooltip-disabled">Analytics</Tooltip>}>
                                <span className="d-inline-block">
                                        <FaChartBar className='sidebar-icon'/>
                                </span>
                            </OverlayTrigger>  
                        </Link>
                        <Link to='/Commandes' className='navigation'>
                            <OverlayTrigger placement='right' overlay={<Tooltip id="tooltip-disabled">Commandes</Tooltip>}>
                                <span className="d-inline-block">
                                    <FaShoppingCart className='sidebar-icon'/>
                                </span>
                            </OverlayTrigger>
                        </Link>
                        <Link to='/Fournisseurs' className='navigation'>
                            <OverlayTrigger placement='right' overlay={<Tooltip id="tooltip-disabled">Fournisseurs</Tooltip>}>
                                <span className="d-inline-block">
                                    <FaTruck className='sidebar-icon'/>
                                </span>
                            </OverlayTrigger>
                        </Link>
                        <Link to='/Centres_de_montages' className='navigation'>
                        <OverlayTrigger placement='right' overlay={<Tooltip id="tooltip-disabled">Centres de Montages</Tooltip>}>
                                <span className="d-inline-block">
                                    <GiAutoRepair className='sidebar-icon'/>
                                </span>
                            </OverlayTrigger>
                        </Link>
                        <Link to='/Pneus' className='navigation'>
                        <OverlayTrigger placement='right' overlay={<Tooltip id="tooltip-disabled">Pneus</Tooltip>}>
                                <span className="d-inline-block">
                                    <GiCarWheel className='sidebar-icon'/>
                                </span>
                            </OverlayTrigger>   
                        </Link>
                        <Link to='/Publicite' className='navigation'>
                            <OverlayTrigger placement='right' overlay={<Tooltip id="tooltip-disabled">Publicité</Tooltip>}>
                                <span className="d-inline-block">
                                    <FaBullhorn className='sidebar-icon'/>
                                </span>
                            </OverlayTrigger>
                        </Link>
                    </Nav>
                </div>
            </Styles>
 * 
 * 
 * 
 * 
 */