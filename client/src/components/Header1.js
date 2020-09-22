import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Nav, Navbar, Tab, Row, Col, Form} from 'react-bootstrap'
import styled from 'styled-components';
import { motion} from "framer-motion";

//backgrounds
import backgroundAuto from '../assets/photo-of-red-suv-on-dirt-road.jpg'
import backgroundMoto from '../assets/red-and-white-dirt-bike.jpg'
import backgroundAgro from '../assets/toyota-4x4-sunset.jpg'
import backgroundPromo from '../assets/silver-car-with-dust.jpg'
import pneu from '../assets/Pneu.png'

//logo
import logo from '../assets/PneuS-03.png'

//icons
import {AiFillCaretRight} from 'react-icons/ai'


const Styles = styled.div`
font-size:16px;
height:100vh;
overflow:hidden;
.navbar-links{
    color:#fff;
    font-weight:600;
    &:hover{
        text-decoration:none;
    }
}
.promo-link{
    background: rgba(255, 0, 0, 0.5);
    border-radius:5px;
    font-weight:900
}
a.nav-link{
    &:hover{
        border-bottom: solid rgba(255, 0, 0, 0.5);
        text-decoration:none;
    }
}
.underline-active{
    border-bottom: solid rgba(255, 0, 0, 0.5);
    text-decoration:none;
}
.navbar-section{
   height:15%;
}
.landing-text{
    color: white;
    width:100%;
    height:50%;
    padding-left:12%;
    padding-bottom: 2%;
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
    margin-left: 5%;
    margin-top: 5%;
}
.landing-text-scroll{
    color: white;
    width:100%;
    height:50%;
    padding-left:12%;
    padding-bottom: 2%;
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
}
.landing-page-left-row{
    display:flex;
    flex-direction:column;
    justify-content:center;
}
.landing-big-title{
   padding:0;
   margin:0;
   display:flex;
   flex-direction:column;
}

.landing-button{
    font-size:1.5em;
    font-weight:600;
    background: #EF1A23;
    height:20%;
    width:50%;
    border-radius:5px;
    border:none;
    color:white;
}
.search-bar{
    height:35%;
    width:100%;
    display:flex;
    flex-direction:row;
    padding:0 3%;
}
.search-bar-first-col{
   background: rgba(255, 0, 0, 0.4);
   width:100%;
   height:100%;
   color:white;
   border-radius:15px;
}
.search-first-row{
    display:flex;
    flex-direction:row;
    padding:1%;
    height:50%;
    justify-content:center;
    align-items:center;
}
.search-second-row{
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items:flex-end;
    height:50%;
}
.search-button{
    font-size:1.5em;
    font-weight:600;
    background: #333;
    width:14%;
    height: 90%;
    border-radius:5px;
    border:none;
    color:white;
    margin: 2% 3% 0 0;
}
.search-input{
    margin:0 1%;
    width: 12%;
}
.nav-tabs > a
 {
    font-weight:bolder;
    color:white;
}
`;

function Header(props) { 
    const { location } = props;
    const [lastYPos, setLastYPos] = React.useState(0);
    const [isShown, setIsShown] = useState(true)
    const [key, setKey] = useState("dimension");
    const ActiveStyle = {
        textAlign: "left",
        background: "transparent",
        color: "white",
        fontWeight:'600',
        fontSize:'1.2em'
    };
    const inActiveStyle = {
        ...ActiveStyle,
        background: "rgba(0, 0, 0, 0.4)",
        color: "white",
        fontWeight:'600',
        fontSize:'1.2em'
    };
    
    useEffect(() => {
        function handleScroll() {
            const yPos = window.scrollY;
            const isScrollingUp = yPos < lastYPos;
            const text = document.getElementById('landingText');
      
            setIsShown(isScrollingUp);
            setLastYPos(yPos);

            if (isScrollingUp){
                text.classList.replace('landing-text-scroll', 'landing-text')
            }else{
                text.classList.replace('landing-text', 'landing-text-scroll')
            }
          }

        window.addEventListener('scroll', handleScroll, false )
        return () => {
            window.removeEventListener("scroll", handleScroll, false);
        }
      }, [lastYPos]);

    //background picker
    function backgroundSelect(){
        switch(props.navigation){
            case '/PneuMoto': return backgroundMoto;
            case '/PneuAgro': return backgroundAgro;
            case '/promos': return backgroundPromo;
            default: return backgroundAuto
        }
    }
    return(
       <React.Fragment>
           <Styles 
              style={{
                  background:`-webkit-linear-gradient( rgba(0, 0, 0, 0.1) 100%,transparent 100%), url(${backgroundSelect()})`, 
                  height:'100vh',
                  backgroundSize:'cover',
                  backgroundPosition:'center'
                  }}>
                <div className='navbar-section'>
                <Navbar expand="lg" bg="none" variant="light" activeKey={location.pathname}>
                    <Navbar.Brand>
                    <img
                        src={logo}
                        width="140"
                        height="65"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link id='nav1' ><Link className='navbar-links' to='/'>Pneu Auto</Link></Nav.Link>
                            <Nav.Link id='nav2'><Link className='navbar-links' to='/PneuMoto'>Pneu Moto</Link></Nav.Link>
                            <Nav.Link id='nav3'><Link className='navbar-links' >Pneu Genie civile</Link></Nav.Link>
                            <Nav.Link id='nav4'><Link className='navbar-links' >Pneu Manutation</Link></Nav.Link>
                            <Nav.Link id='nav5'><Link className='navbar-links' to='/PneuAgro'>Pneu Agro</Link></Nav.Link>
                            <Nav.Link id='nav6'><Link className='navbar-links' >Pneu Poids lourd</Link></Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link className='promo-link'><Link className='navbar-links' to='/promos'>Promo</Link></Nav.Link>
                            <Nav.Link id='nav7'><Link className='navbar-links' >Montage</Link></Nav.Link>
                            <Nav.Link id='nav8'><Link className='navbar-links' >Marques</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                </div>
                <motion.div 
                  className='landing-text'
                  id='landingText'
                  animate={{scale: isShown ? 1.2 : 0.9}}
                  transition={{ duration: 0.9 }}
                  >
                    <div className='landing-page-left-row'>
                        <div className='landing-big-title'>
                           <h1 style={{fontWeight:'900', fontSize:'8em'}}>-40% </h1>
                           <p style={{fontWeight:'900', fontSize:'2em', margin:'0'}}>sur tous nos produits</p>
                        </div>
                        <p style={{fontWeight:'600', fontSize:'2em', margin:'0'}}>Jusqu'au 20 Juin</p>
                        <button className='landing-button'>J'EN PROFITE</button>
                    </div>
                </motion.div>
                <motion.div 
                   className='search-bar'
                   animate={{opacity : isShown ? 0 : 1}}
                >
                    <div className='search-bar-first-col'>
                       <Tab.Container id="controlled-tab-example" activeKey={key} onSelect={key => setKey(key)}>
                            <Row>
                                <Col>
                                    <Nav.Link  
                                    eventKey="dimension" 
                                    style={key === "dimension" ? ActiveStyle : inActiveStyle}
                                    >
                                        <AiFillCaretRight style={{marginRight:'1%'}}/>
                                        Recherche Par dimension
                                    </Nav.Link>
                                </Col>
                                <Col>
                                    <Nav.Link  
                                    eventKey="vehicule" 
                                    style={key === "vehicule" ? ActiveStyle : inActiveStyle}
                                    >
                                         <AiFillCaretRight style={{marginRight:'1%'}}/>
                                        Recherche Par vehicule
                                    </Nav.Link>
                                </Col>
                            </Row>
                            <Tab.Content>
                                <Tab.Pane eventKey="dimension" >
                                    <div className='search-first-row'>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Largeur</Form.Label>
                                            <Form.Control as="select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Largeur</Form.Label>
                                            <Form.Control as="select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Hauteur</Form.Label>
                                            <Form.Control as="select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Diametre</Form.Label>
                                            <Form.Control as="select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Charge</Form.Label>
                                            <Form.Control as="select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Vitesse</Form.Label>
                                            <Form.Control as="select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Marque</Form.Label>
                                            <Form.Control as="select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className='search-second-row'>
                                       <button className='search-button'>Rechercher</button>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="vehicule">
                                <div className='search-first-row'>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Marque</Form.Label>
                                            <Form.Control as="select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Modele</Form.Label>
                                            <Form.Control as="select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Motorisation</Form.Label>
                                            <Form.Control as="select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Annee</Form.Label>
                                            <Form.Control as="select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Taille</Form.Label>
                                            <Form.Control as="select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Saison</Form.Label>
                                            <Form.Control as="select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className='search-second-row'>
                                       <button className='search-button'>Rechercher</button>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </motion.div>
           </Styles>
       </React.Fragment> 
    )}

export default Header;

