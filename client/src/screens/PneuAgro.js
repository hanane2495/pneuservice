import React, {useState, useEffect} from 'react';
import { Link, useRouteMatch, Route } from 'react-router-dom';
import {Nav, Tab, Row, Col, Form, TabContainer} from 'react-bootstrap'
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
import SearchResult from '../components/SearchResult';


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

function Home(props){
    let match = useRouteMatch();

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
        charge :'-- --', 
        vitesse:'Tous',
        marque :'Tous'
    })
    const [formDataVehicule, setFormDataVehicule] = useState({
        marque :'-- --', 
        modele :'-- --',
        motorisation : '-- --',
        annee :'-- --', 
        taille:'-- -- -- --'
    })
    const [parametres, setParametres] = useState({
        largeur :'', 
        hauteur :'',
        diametre :'',
        charge :'', 
        vitesse:'',
    })
    const [typeRecherche, setTypeRecherche] = useState('dimension')
    const [resultat, setResultat] = useState([])

    //les dimensions 'dimension'
    const [largeurs, setLargeurs]= useState([]);
    const [hauteurs, setHauteurs]= useState([]);
    const [diametres, setDiametres]= useState([]);
    const [charges, setCharges]= useState([]);
    const [vitesses, setVitesses] = useState([]);
    const [marques, setMarques]= useState([]);
    
    //les dimensions vehicule
    const [marqueVs, setMarqueVs] = useState([]);
    const [modeles, setModeles] = useState([]);
    const [motorisations, setMotorisations] = useState([]);
    const [annees, setAnnees] = useState([]);
    const [tailles, setTailles] = useState([]);

    //
    //const {largeur, hauteur, diametre, charge, vitesse, marque} = formDataDimension
    //const {marqueV, modele, motorisation, annee, taille} = formDataVehicule

    //handle change from inputs
    const handleChangeDimension = text => e => {
        setFormDataDimension({...formDataDimension, [text]: e.target.value})
        
    }

    const handleChangeVehicule = text => e => {
        setFormDataVehicule({...formDataVehicule, [text]: e.target.value})
    }

    //recherche par dimension
    //get all Largeurs, vitesses et marques
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/search/dimension/largeur`)
        .then(res => {
            var lars = []
            res.data.map((larg) => {
                lars.push(parseFloat(larg.largeur))
            })
            setLargeurs(lars.sort(function(a, b){return a-b})) 
            setFormDataDimension({...formDataDimension, 
                hauteur:'-- --',
                diametre:'-- --',
                charge:'-- --'
            })
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/search/dimension/vitesse`)
        .then(res => {
            console.log('useEffect vitesse')

            var vites = []
            res.data.map((vit) => {
                vites.push(vit.vitesse)
            })
            setVitesses(vites.sort()) 
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        
        axios.post(`${process.env.REACT_APP_API_URL}/search/dimension/marque`)
        .then(res => {
            console.log('useEffect vitesse')
            var mars = []
            res.data.map((mar) => {
                mars.push(mar.marque)
            })
            setMarques(mars.sort()) 
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    //get hauteur depending on largeur
    useEffect(() => {
        var largeur = formDataDimension.largeur
        axios.post(`${process.env.REACT_APP_API_URL}/search/dimension/hauteur`, {
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
            console.log('hauteur executed')
        })
        .catch(err => {
            console.log(err)
        })
    },[formDataDimension.largeur])

    
    //get diametre depending on largeur et hauteur
    useEffect(() => {
        var largeur = formDataDimension.largeur
        var hauteur = formDataDimension.hauteur
        axios.post(`${process.env.REACT_APP_API_URL}/search/dimension/diametre`, {
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
            console.log('diametre executed')
        })
        .catch(err => {
            console.log(err)
        })
    },[formDataDimension.hauteur])

    //get charge depending on largeur et hauteur et diametre
    useEffect(() => {
        var largeur = formDataDimension.largeur
        var hauteur = formDataDimension.hauteur
        var diametre = formDataDimension.diametre
        axios.post(`${process.env.REACT_APP_API_URL}/search/dimension/charge`, {
            largeur, hauteur, diametre
        })
        .then(res => {
            var chars = []
            var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
            res.data.map((char) => {
                chars.push(char.charge)
            })
            setCharges(chars.sort(collator.compare))
        })
        .catch(err => {
            console.log(err)
        })
    },[formDataDimension.diametre])

    
    //recherche par vehicule
    //get all marques
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/search/vehicule/marque`)
        .then(res => {
            
            var marquesVehicule = []
            res.data.map((marq) => {
                marquesVehicule.push(marq.brand)
            })
            setMarqueVs(marquesVehicule.sort()) 
            setFormDataDimension({...formDataDimension, 
                modele :'-- --',
                motorisation : '-- --',
                annee :'-- --', 
                taille:'-- --'
            })
        })
        .catch(err => {
            console.log(err)
        })
    }, []);

    //get all modeles depending on marques
    useEffect(() => {
        var marque = formDataVehicule.marque
        console.log(marque)
        axios.post(`${process.env.REACT_APP_API_URL}/search/vehicule/modele`, {
             marque
        })
        .then(res => {
            var modeles = []
            res.data.map((mod) => {
                modeles.push(mod.model)
            })
            setModeles(modeles.sort()) 
            setFormDataDimension({...formDataDimension, 
                motorisation : '-- --',
                annee :'-- --', 
                taille:'-- --'
            })
        })
        .catch(err => {
            console.log(err)
        })
    }, [formDataVehicule.marque]);

    //get all motorisations depending on marques et modele
    useEffect(() => {
        var marque = formDataVehicule.marque
        var modele = formDataVehicule.modele
        axios.post(`${process.env.REACT_APP_API_URL}/search/vehicule/motorisation`, {
            marque, modele
        })
        .then(res => {
            var motorisations = []
            var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
            res.data.map((mot) => {
                motorisations.push(mot.engine)
            })
            setMotorisations(motorisations.sort()) 
            setFormDataDimension({...formDataDimension, 
                annee :'-- --', 
                taille:'-- --'
            })
        })
        .catch(err => {
            console.log(err)
        })
    }, [formDataVehicule.modele]);

    //get all annee depending on marque et modele et motorisation
    useEffect(() => {
        var marque = formDataVehicule.marque
        var modele = formDataVehicule.modele
        var motorisation = formDataVehicule.motorisation
        axios.post(`${process.env.REACT_APP_API_URL}/search/vehicule/annee`,{
             marque, modele, motorisation
        })
        .then(res => {
            var annees = []
            res.data.map((an) => {
                annees.push(an.ad)
            })
            setAnnees(annees.sort()) 
            setFormDataDimension({...formDataDimension, 
                taille:'-- --'
            })
        })
        .catch(err => {
            console.log(err)
        })
    }, [formDataVehicule.motorisation]);

    //get all tailles depending on marque et modele et motorisation et annee
    useEffect(() => {
        var marque = formDataVehicule.marque
        var modele = formDataVehicule.modele
        var motorisation = formDataVehicule.motorisation
        var annee = formDataVehicule.annee
        axios.post(`${process.env.REACT_APP_API_URL}/search/vehicule/taille`, {
             marque, modele, motorisation, annee
        })
        .then(res => {
            var tailles = []
            var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
            res.data.map((taille) => {
                tailles.push(taille.dimension_complete)
            })
            setTailles(tailles.sort(collator.compare)) 
           
        })
        .catch(err => {
            console.log(err)
        })
    }, [formDataVehicule.annee]);

    //get largeur, hauteur, diametre, charge, vitesse
    useEffect(() => {
        var marque = formDataVehicule.marque
        var modele = formDataVehicule.modele
        var motorisation = formDataVehicule.motorisation
        var annee = formDataVehicule.annee
        var taille = formDataVehicule.taille
        axios.post(`${process.env.REACT_APP_API_URL}/search/vehicule/params`,{
            marque, modele, motorisation, annee, taille
        })
        .then(res => {
            console.log(res.data[0])
            console.log(res.data[0].largeur+' '+res.data[0].hauteur+' '+res.data[0].diametre+' '+res.data[0].charge)
            setParametres({...parametres,
                charge:res.data[0].charge,
                largeur:res.data[0].largeur,
                hauteur:res.data[0].hauteur,
                diametre:res.data[0].diametre
            })
        })
        .catch(err => {
            console.log(err)
        })
    }, [formDataVehicule.taille]);

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
                                                <Form.Label>Type de pneu</Form.Label>
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
                                                <Form.Label>position</Form.Label>
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
                                                <Form.Label>marque</Form.Label>
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
                                                <Form.Label>largeur</Form.Label>
                                                <Form.Control as="select"
                                                    value={formDataDimension.charge}
                                                    onChange={handleChangeDimension('charge')}
                                                    >
                                                        <option>-- --</option>
                                                        {charges.map((charge) => 
                                                            <option>{charge}</option>
                                                        )}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                                <Form.Label>serie</Form.Label>
                                                <Form.Control as="select"
                                                    value={formDataDimension.vitesse}
                                                    onChange={handleChangeDimension('vitesse')}
                                                    >
                                                        <option>Tous</option>
                                                        {vitesses.map( (vitesse) => 
                                                            <option>{vitesse}</option>
                                                        )}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                                <Form.Label>diametre</Form.Label>
                                                <Form.Control as="select"
                                                    value={formDataDimension.marque}
                                                    onChange={handleChangeDimension('marque')}
                                                    >
                                                        <option>Tous</option>
                                                        {marques.map( (marque) => 
                                                            <option>{marque}</option>
                                                        )}
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div className='search-second-row'>
                                            <button type='submit' className='search-button'>
                                                <Link to={`/selection/pneus/largeur=${formDataDimension.largeur}/hauteur=${formDataDimension.hauteur}/diametre=${formDataDimension.diametre}/charge=${formDataDimension.charge}`}>Rechercher</Link>                                        
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


/**
 * 
 *  <img
        src={`https://www.monsterstudio.org${image_url}`}
        style={{margin:'0 0 28% 0', padding:'0'}}
    />
 * <Product_Carousel/>


 {clicked ? <SearchResult resultat = {resultat} dimensions={formDataDimension} params={parametres} typeRecherche={typeRecherche}/> : 
 <div></div> }
 * 



 //submit data to backend
    const handleSubmit = e => {
    e.preventDefault()
        setTypeRecherche('dimension')
        var largeur = formDataDimension.largeur
        var hauteur = formDataDimension.hauteur
        var diametre = formDataDimension.diametre
        var charge = formDataDimension.charge
        var vitesse = formDataDimension.vitesse 
        var marque = formDataDimension.marque
        console.log(largeur+' '+hauteur+' '+diametre+' '+charge)
    axios.post(`${process.env.REACT_APP_API_URL}/search/pneus`, {
        largeur, hauteur, diametre, charge
         }).then(res => {
           setResultat(res.data)
           console.log(res.data)
         }).catch(err => {
          console.log(err)
         })   
    }

    const handleSubmitV = e => {
        e.preventDefault()
        setTypeRecherche('vehicule')
            var largeur = parametres.largeur
            var hauteur = parametres.hauteur
            var diametre = parametres.diametre
            var charge = parametres.charge
            console.log(largeur+' '+hauteur+' '+diametre+' '+charge)
        axios.post(`${process.env.REACT_APP_API_URL}/search/pneus`, {
            largeur, hauteur, diametre, charge
             }).then(res => {
               setFormDataDimension({...formDataDimension,
                largeur: parametres.largeur,
                hauteur: parametres.hauteur,
                diametre: parametres.diametre,
                charge: parametres.charge,
            })  
               setResultat(res.data)
               console.log(res.data)
             }).catch(err => {
              console.log(err)
             })   
        }
 */





