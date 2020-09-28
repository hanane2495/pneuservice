import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Nav, Tab, Row, Col, Form} from 'react-bootstrap'
import styled from 'styled-components';
import { motion} from "framer-motion";
import axios from 'axios'

//images
import redCar from '../assets/agricole2.jpg'
import service from '../assets/service.png'
import logo_transparent from '../assets/logo-transparent.png'

//images
import dark from '../assets/dark1.jpg'

//icons
import {AiFillCaretRight} from 'react-icons/ai'

//component
//import Product_Carousel from '../components/Carousel'
import Recommandation from '../components/Recommandation'
import Coordonnee from '../components/Coordonnee'
import Navbar from '../components/Navbar'


const Styles = styled.div`
    height:100%;
    display: grid;
    grid-template-columns: 1fr repeat(12, minmax(auto, 4.2rem)) 1fr;
    grid-template-rows:5.8rem 28.5rem 5rem auto;
    gap : 0 2rem;

    .navbar-item{
        grid-column: 1 / span 14;
        grid-row: 1 / 2;
        z-index:10;
    }
    .promo-item{
        grid-column: 1 / span 14;
        grid-row: 1 / 4;
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
    }
    .promo-left-side{
         display:flex;
         width: 40%;
         height: 100%;
         background:url(${dark});
         background-size:cover;
         align-items:center;
         justify-content:flex-end;
    }
    .promo-right-side{
        display:flex;
        width: 60%;
        height: 100%;
        background: -webkit-linear-gradient( rgba(0, 0, 0, 0.3) 100%,transparent 100%), url(${redCar});
        background-size:cover;
        align-items:center;
        justify-content:flex-start;
    }

    .content-item{
        grid-column: 2 / span 12;
        grid-row: 3 / 5;
        background:#fff;
        z-index:1;
        text-align:center;
    }

    .search-item{
        height:auto;
        width:100%;
        background:#333333;  
        color:white;
        padding-bottom:1%;
        margin-bottom:5%;
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
        width:14%;
        font-size:1.5em;
        font-weight:600;
        background:#4F7302;
        border-radius:5px;
        border:none;
        color:white;
        margin:0 2% 1% 0;
        width:auto;
        padding:0.5% 2%;
    }
    .search-input{
        margin:1% 1%;
        width: 15%;
    }
    .coordonnee{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        width:100%;
        height:100%;
        padding: 2% 0;
    }
    .card-coordonnee{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        width:35%;
        height:100%;
        border-radius:10px;
    }
    .card-col-1{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        width:100%;
        height:100%;
        background:transparent;
        border-radius:50%
    }
    .card-col-2{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        width:100%;
        height:100%;
    }
    .card-col-3{
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        justify-content:center;
        width:5%;
        height:100%;
        padding-left:5%;
    }

    a{
        color:white;
        text-decoration:none;
    }

`;

const Section_marques = styled.div`
margin-top:2%;
    .marques{
        padding:0;
        margin: 5% 0;
    }
    .titre-marques{
        text-align:center;
        margin-bottom:2%;
        font-size:2em;
        font-weight:600;
        color:#555;
        font-family:'Roboto', 'sans-serif '
    }
`

function Home(){

    //search styling
    const [key, setKey] = useState("dimension");
    const ActiveStyle = {
        textAlign: "left",
        background: "transparent",
        color: "white",
        fontSize:'1.5em',
        fontFamily:'NTR, sans-serif ' 
    };
    const inActiveStyle = {
        ...ActiveStyle,
        background: "rgba(0, 0, 0, 0.4)",
        color: "white",
        fontSize:'1.5em',
        fontFamily:'NTR, sans-serif ' 

    };

    //data management
    const [formDataDimension, setFormDataDimension] = useState({
        largeur :'-- --', 
        hauteur :'-- --',
        diametre :'-- --',
        type:'Tous',
        marque :'Tous'
    })

    //les dimensions 'dimension'
    const [largeurs, setLargeurs]= useState([]);
    const [hauteurs, setHauteurs]= useState([]);
    const [diametres, setDiametres]= useState([]);
    const [types, setTypes] = useState([]);
    const [marques, setMarques]= useState([]);
    
    //handle change from inputs
    const handleChangeDimension = text => e => {
        setFormDataDimension({...formDataDimension, [text]: e.target.value})  
    }

    //get all largeurs
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/agricole/search/dimension/largeur`)
        .then(res => {
            var lars = []
            res.data.map((larg) => {
                lars.push(parseFloat(larg.largeur))
            })
            setLargeurs(lars.sort(function(a, b){return a-b})) 
            setFormDataDimension({...formDataDimension, 
                hauteur:'-- --',
                diametre:'-- --'
            })
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    //get hauteur depending on largeur
    useEffect(() => {
        var largeur = formDataDimension.largeur
        axios.post(`${process.env.REACT_APP_API_URL}/agricole/search/dimension/hauteur`, {
            largeur
        })
        .then(res => {
            var hauts = []
            var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
            res.data.map((haut) => {
                hauts.push(haut.hauteur)
            })
            setHauteurs(hauts.sort(collator.compare))
            setFormDataDimension({...formDataDimension, 
                diametre:'-- --',
                charge:'-- --'
            })
        })
        .catch(err => {
            console.log(err)
        })
    },[formDataDimension.largeur])

    
    //get diametre depending on largeur et hauteur
    useEffect(() => {
        var largeur = formDataDimension.largeur
        var hauteur = formDataDimension.hauteur
        axios.post(`${process.env.REACT_APP_API_URL}/agricole/search/dimension/diametre`, {
            largeur, hauteur
        })
        .then(res => {
            var diams = []
            var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
            res.data.map((diam) => {
                diams.push(diam.diametre)
            })
            setDiametres(diams.sort(collator.compare))
            setFormDataDimension({...formDataDimension, 
                charge:'-- --'
            })
        })
        .catch(err => {
            console.log(err)
        })
    },[formDataDimension.hauteur])

    //get type depending on largeur et hauteur et diametre
    useEffect(() => {
        var largeur = formDataDimension.largeur
        var hauteur = formDataDimension.hauteur
        var diametre = formDataDimension.diametre
        axios.post(`${process.env.REACT_APP_API_URL}/agricole/search/dimension/type`, {
            largeur, hauteur, diametre
        })
        .then(res => {
            var typs = []
            var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
            res.data.map((typ) => {
                typs.push(typ.type)
            })
            setTypes(typs.sort(collator.compare))
        })
        .catch(err => {
            console.log(err)
        })
    },[formDataDimension.diametre])

    //get type depending on largeur et hauteur et diametre
    useEffect(() => {
        var largeur = formDataDimension.largeur
        var hauteur = formDataDimension.hauteur
        var diametre = formDataDimension.diametre
        var type = formDataDimension.type
        axios.post(`${process.env.REACT_APP_API_URL}/agricole/search/dimension/marque`, {
            largeur, hauteur, diametre, type
        })
        .then(res => {
            var marqs = []
            var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
            res.data.map((marq) => {
                marqs.push(marq.marque)
            })
            setMarques(marqs.sort(collator.compare))
        })
        .catch(err => {
            console.log(err)
        })
    },[formDataDimension.type])
    return(
        <React.Fragment>
            <Styles>
                <div className='navbar-item'>
                    <Navbar bg="none" variant="light"/>
                </div>
                <div className='promo-item'>
                    <div className='promo-left-side'>
                        <img
                            src={logo_transparent}
                            width='80'
                            height='170'
                            style={{margin:'0 0 50% 0', padding:'0'}}
                        />
                    </div>
                    <div className='promo-right-side'>
                        <img
                            src={service}
                            width='20'
                            height='150'
                            style={{margin:'0 0 28% 0', padding:'0'}}
                        />
                    </div>
                </div>
                <div className='content-item'>
                    <div className='search-item'>
                        <Tab.Container id="controlled-tab-example" activeKey={key} onSelect={key => setKey(key)}>
                            <Tab.Content>
                                <Tab.Pane eventKey="dimension" >
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
                                    </Row>
                                    <form >
                                        <div className='search-first-row'>
                                            <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Largeurs</Form.Label>
                                                <Form.Control 
                                                    as="select"
                                                    value={formDataDimension.largeur}
                                                    onChange={handleChangeDimension('largeur')}
                                                    >
                                                        <option>-- --</option>
                                                        {largeurs.map( (largeur) => 
                                                            <option>{largeur}</option>
                                                        )}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Serie</Form.Label>
                                                <Form.Control 
                                                    as="select"
                                                    value={formDataDimension.hauteur}
                                                    onChange={handleChangeDimension('hauteur')}
                                                    >
                                                        <option>-- --</option>
                                                        {hauteurs.map((hauteur) => 
                                                            <option>{hauteur}</option>
                                                        )}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Diametre</Form.Label>
                                                <Form.Control as="select"
                                                    value={formDataDimension.diametre}
                                                    onChange={handleChangeDimension('diametre')}
                                                    >
                                                       <option>-- --</option>
                                                       {diametres.map((diametre) => 
                                                            <option>{diametre}</option>
                                                        )}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Type de pneu</Form.Label>
                                                <Form.Control as="select"
                                                    value={formDataDimension.type}
                                                    onChange={handleChangeDimension('type')}
                                                    >
                                                        <option>Tous</option>
                                                        {types.map((type) => 
                                                            <option>{type}</option>
                                                        )}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Marque</Form.Label>
                                                <Form.Control as="select"
                                                    value={formDataDimension.marque}
                                                    onChange={handleChangeDimension('marque')}
                                                    >
                                                        <option>Tous</option>
                                                        {marques.map((marque) => 
                                                            <option>{marque}</option>
                                                        )}
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div className='search-second-row'>
                                            <button type='submit' className='search-button'>
                                                <Link to={`/selection/pneus-agricole/largeur=${formDataDimension.largeur}/hauteur=${formDataDimension.hauteur}/diametre=${formDataDimension.diametre}/type=${formDataDimension.type}/marque=${formDataDimension.marque}`}>Rechercher</Link>                                        
                                            </button>
                                        </div>
                                    </form>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </div>
            </Styles>
             <div>
             <Coordonnee color='#4F7302' type='agro'/>
             <hr/>
             <Section_marques>
                 <p className='titre-marques'>Nos Recommandations</p>
                 <Recommandation color='#4F7302' rgb='rgba(79,115,2, 0.5)'/>
                 <div className='marques'>
                     <p className='titre-marques'>Nos marques de Pneu Auto</p>
                 </div>
             </Section_marques>
         </div>
            
           
        </React.Fragment>
    )
}
export default Home; 

