import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Nav, Navbar, Tab, Row, Col, Form} from 'react-bootstrap'
import styled from 'styled-components';
import { motion} from "framer-motion";
import axios from 'axios'

//images
import redCar from '../assets/red-car.jpg'
import pneus from '../assets/pneus.png'
import commande from '../assets/commandes.png'
import payment from '../assets/payement.png'
import service from '../assets/service.png'
import logo_transparent from '../assets/logo-transparent.png'
import remise from '../assets/remise-01.png'



//icons
import {AiFillCaretRight} from 'react-icons/ai'



const Styles = styled.div`
height: 150vh;
display: grid;
grid-template: repeat(16, [row] 1fr) / repeat(14, [col] 1fr);
margin-bottom:5%;

.item-1 {
    grid-column: col 1 / span 14;
    grid-row: row 1 / span 2 ;
    background: transparent;
    z-index:1;
}


.item-3 {
  grid-column: col 1 / span 5;
  grid-row: row 1 / span 11 ;
  background: #2F3945;
  opacity: 0.8;
  display:flex;
  flex-direction:row;
  justify-content:flex-end;
  align-items: center;
}

.item-4 {
  grid-column: col 6 / span 11;
  grid-row: row 1 / span 11 ;
  background: -webkit-linear-gradient( rgba(0, 0, 0, 0.3) 100%,transparent 100%), url(${redCar});
  background-size:cover;
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:center;
}

.item-5 {
  grid-column: col 2 / span 12;
  grid-row: row 9 / span 4;
  background: linear-gradient(90.84deg, #EF1A23 0.61%, #FB3C29 99.42%);  
  opacity: 0.8;
  color:white;
  z-index: 1;
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
    background:#2F3945;
    border-radius:5px;
    border:none;
    color:white;
    margin: 0 3% 0 0;
}
.search-input{
    margin:1% 1%;
    width: 12%;
}


.item-6 {
  grid-column: col 1 / span 14;
  grid-row: row 12 / span 4 ;
  background: linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0.08) 57.24%, rgba(47, 57, 69, 0.54) 104.71%);
}
.item-7{
  grid-column: col 2 / span 12;
  grid-row: row 14 / span 4;
  background: transparent;
}
.item-8{
  grid-column: col 2 / span 12;
  grid-row: row 3 / span 5;
  background: url(${remise}) no-repeat;
  z-index:1;
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
`;

function Header(props){
    //search styling
    const [key, setKey] = useState("dimension");
    const ActiveStyle = {
        textAlign: "left",
        background: "transparent",
        color: "white",
        fontSize:'1.5em',
        fontFamily:'Teko, sans-serif ' 
    };
    const inActiveStyle = {
        ...ActiveStyle,
        background: "rgba(0, 0, 0, 0.4)",
        color: "white",
        fontSize:'1.5em',
        fontFamily:'Teko, sans-serif ' 

    };

    //data management
    const [pneuDimension, setPneuDimension] = useState([])
    const [pneuVehicule, setPneuVehicule] = useState([])
    const [formDataDimension, setFormDataDimension] = useState({
        largeur :'--', 
        hauteur :'--',
        diametre : '--',
        charge :'--', 
        vitesse:'Tous',
        marque :'Tous'
    })
    const [formDataVehicule, setFormDataVehicule] = useState({
        marqueV :'--', 
        modele :'--',
        motorisation : '--',
        annee :'--', 
        taille:'-- --'
    })

    //les dimensions 'dimension'
    const [largeurs, setLargeurs]= useState([]);
    const [hauteurs, setHauteurs]= useState([]);
    const [diametres, setDiametres]= useState([]);
    const [charges, setCharges]= useState([]);
    const [vitesses, setVitesse] = useState([]);
    const [marques, setMarques]= useState([]);
    
    //les dimensions vehicule
    const [marqueVs, setMarqueVs] = useState([]);
    const [modeles, setModeles] = useState([]);
    const [motorisations, setMotorisations] = useState([]);
    const [annees, setAnnees] = useState([]);
    const [tailles, setTailles] = useState([]);

    //
    const {largeur, hauteur, diametre, charge, vitesse, marque} = formDataDimension
    const {marqueV, modele, motorisation, annee, taille} = formDataVehicule

    //handle change from inputs
    const handleChangeDimension = text => e => {
        setFormDataDimension({...formDataDimension, [text]: e.target.value})
        console.log(formDataDimension)
    }

    const handleChangeVehicule = text => e => {
        setFormDataVehicule({...formDataVehicule, [text]: e.target.value})
    }

    useEffect(() => {
        let hauteurs = []
        let diametres = []
        let charges = []
            pneuDimension.map((pneuDim)=>{
                if(pneuDim.largeur==largeur){
                    hauteurs.push(pneuDim.hauteur);
                    diametres.push(pneuDim.diametre);
                    charges.push(pneuDim.charge);
                }
            })
            setHauteurs(
                hauteurs.filter((q, idx) => 
                hauteurs.indexOf(q) === idx)
            )
            setDiametres(
                diametres.filter((q, idx) => 
                diametres.indexOf(q) === idx)
            )
            setCharges(
                charges.filter((q, idx) => 
                charges.indexOf(q) === idx)
            )
    },[largeur])
    useEffect(() => {
        let diametres = []
        let charges = []
            pneuDimension.map((pneuDim)=>{
                if(pneuDim.largeur==largeur && pneuDim.hauteur==hauteur){
                    diametres.push(pneuDim.diametre);
                    charges.push(pneuDim.charge);
                }
            })
            setDiametres(
                diametres.filter((q, idx) => 
                diametres.indexOf(q) === idx)
            )
            setCharges(
                charges.filter((q, idx) => 
                charges.indexOf(q) === idx)
            )
    },[hauteur])
    useEffect(() => {
        let charges = []
            pneuDimension.map((pneuDim)=>{
                if(pneuDim.largeur==largeur && pneuDim.hauteur==hauteur && pneuDim.diametre==diametre){
                    charges.push(pneuDim.charge);
                }
            })
            console.log(charges)
            setCharges(
                charges.filter((q, idx) => 
                charges.indexOf(q) === idx)
            )
    },[diametre])

//filtre recherche par vehicule
    useEffect(() => {
        let modeles = []
        let motorisations = []
        let annee = []
        let tailles = []
            pneuVehicule.map((pneuVeh)=>{
                if(pneuVeh.brand==marqueV){
                    modeles.push(pneuVeh.model);
                    motorisations.push(pneuVeh.engine);
                    annee.push(pneuVeh.ad);
                    tailles.push(pneuVeh.dimension_complete);
                }
            })
            setModeles(
                modeles.filter((q, idx) => 
                modeles.indexOf(q) === idx)
            )
            setMotorisations(
                motorisations.filter((q, idx) => 
                motorisations.indexOf(q) === idx)
            )
            setAnnees(
                annee.filter((q, idx) => 
                annee.indexOf(q) === idx)
            )
            setTailles(
                tailles.filter((q, idx) => 
                tailles.indexOf(q) === idx)
            )
    },[marqueV])

    useEffect(() => {
        let motorisations = []
        let annee = []
        let tailles = []
            pneuVehicule.map((pneuVeh)=>{
                if(pneuVeh.brand==marqueV && pneuVeh.model==modele){
                    motorisations.push(pneuVeh.engine);
                    annee.push(pneuVeh.ad);
                    tailles.push(pneuVeh.dimension_complete);
                }
            })
            setMotorisations(
                motorisations.filter((q, idx) => 
                motorisations.indexOf(q) === idx)
            )
            setAnnees(
                annee.filter((q, idx) => 
                annee.indexOf(q) === idx)
            )
            setTailles(
                tailles.filter((q, idx) => 
                tailles.indexOf(q) === idx)
            )
    },[modele])

    useEffect(() => {
        let annee = []
        let tailles = []
            pneuVehicule.map((pneuVeh)=>{
                if(pneuVeh.brand==marqueV && pneuVeh.model==modele && pneuVeh.engine==motorisation){
                    annee.push(pneuVeh.ad);
                    tailles.push(pneuVeh.dimension_complete);
                }
            })
            setAnnees(
                annee.filter((q, idx) => 
                annee.indexOf(q) === idx)
            )
            setTailles(
                tailles.filter((q, idx) => 
                tailles.indexOf(q) === idx)
            )
    },[motorisation])

    useEffect(() => {
        let tailles = []
            pneuVehicule.map((pneuVeh)=>{
                if(pneuVeh.brand==marqueV && pneuVeh.model==modele && pneuVeh.engine==motorisation && pneuVeh.ad==annee){
                    tailles.push(pneuVeh.dimension_complete);
                }
            })
            setTailles(
                tailles.filter((q, idx) => 
                tailles.indexOf(q) === idx)
            )
    },[annee])



    //recherche par dimension
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/search/dimension`)
        .then(res => {
            setPneuDimension(res.data)
            const pneusDim = res.data;
            let lars = []
            let hauts = []
            let diams = []
            let chars = []
            let vites = []
            let mars = []
            const unique = (value, index, self)=>{
                return self.indexOf(value) === index
            }
            pneusDim.map((pneudim)=>{
            lars.push(parseFloat(pneudim.largeur))
            hauts.push(pneudim.hauteur)
            diams.push(parseFloat(pneudim.diametre))
            chars.push(parseInt(pneudim.charge))
            vites.push(pneudim.vitesse)
            mars.push(pneudim.marque)
            })
            const uniquelargeur = lars.filter(unique)
            const uniquehauteur = hauts.filter(unique)
            const uniquediametre = diams.filter(unique)
            const uniquecharge = chars.filter(unique)
            const uniquevitesse = vites.filter(unique)
            const uniquemarque = mars.filter(unique)

            uniquelargeur.sort(function(a, b) {
                return a - b;
            });
            uniquehauteur.sort()
            uniquediametre.sort(function(a, b) {
                return a - b;
            });
            uniquecharge.sort(function(a, b) {
                return a - b;
            });
            uniquevitesse.sort();
            uniquemarque.sort();
            setLargeurs(uniquelargeur)
            setHauteurs(uniquehauteur)
            setDiametres(uniquediametre)
            setCharges(uniquecharge)
            setVitesse(uniquevitesse)
            setMarques(uniquemarque)     
        })
        .catch(err => {
            console.log(err)
        })
    }, [])


    //recherche par vehicule
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/search/vehicule`)
        .then(res => {
            setPneuVehicule(res.data);
            const pneuVehs = res.data;
            let marques = []
            let modeles = []
            let motorisations = []
            let annees = []
            let tailles = []
            const unique = (value, index, self)=>{
                return self.indexOf(value) === index
            }
            pneuVehs.map((pneuVeh)=>{
                marques.push(pneuVeh.brand)
                modeles.push(pneuVeh.model)
                motorisations.push(pneuVeh.engine)
                annees.push(pneuVeh.ad)
                tailles.push(pneuVeh.dimension_complete)
            })
            const uniquemarque = marques.filter(unique)
            const uniquemodele = modeles.filter(unique)
            const uniquemotorisation = motorisations.filter(unique)
            const uniqueannee = annees.filter(unique)
            const uniquetaille = tailles.filter(unique)

            uniquemarque.sort();
            uniquemodele.sort()
            uniquemotorisation.sort();
            uniqueannee.sort();
            uniquetaille.sort();
            
            setMarqueVs(uniquemarque);
            setModeles(uniquemodele);
            setMotorisations(uniquemotorisation);
            setAnnees(uniqueannee);
            setTailles(uniquetaille)
        })
        .catch(err => {
            console.log(err)
        })
    }, []);
    //submit data to backend
  const handleSubmit = e => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/search/pneus`, {
        largeur, hauteur, diametre, charge, vitesse, marque
         }).then(res => {
           console.log(largeur+' '+hauteur+' '+diametre+' '+charge+' '+vitesse+' '+marque)
           console.log(res.data)
           
         }).catch(err => {
          console.log(err)
         })
    }
  


    return(
        <React.Fragment>
            <Styles>
                    <div className='item-1'>
                    
                    </div>
                        <div className='item-8'>
                    </div>
                    <div className='item-3'>
                        <img
                            src={logo_transparent}
                            width='60'
                            height='150'
                            style={{margin:'0 0 50% 0', padding:'0'}}
                        />
                    </div>
                        <div className='item-4'>
                    <img
                        src={service}
                        width='20'
                        height='150'
                        style={{margin:'0 0 28% 0', padding:'0'}}
                    />
                    </div>
                    <div className='item-5'>
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
                                <form onSubmit={handleSubmit}>
                                    <div className='search-first-row'>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Largeur</Form.Label>
                                            <Form.Control 
                                                as="select"
                                                value={largeur}
                                                onChange={handleChangeDimension('largeur')}
                                            >
                                                {largeurs.map((largeur)=>
                                                    <option>{largeur}</option>
                                                )} 
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>hauteur</Form.Label>
                                            <Form.Control 
                                               as="select"
                                               value={hauteur}
                                               onChange={handleChangeDimension('hauteur')}
                                               >
                                                 {hauteurs.map((hauteur)=>
                                                    <option>{hauteur}</option>
                                                )} 
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Diametre</Form.Label>
                                            <Form.Control as="select"
                                               value={diametre}
                                               onChange={handleChangeDimension('diametre')}
                                               >
                                                 {diametres.map((diametre)=>
                                                    <option>{diametre}</option>
                                                )} 
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Charge</Form.Label>
                                            <Form.Control as="select"
                                               value={charge}
                                               onChange={handleChangeDimension('charge')}
                                               >
                                                 {charges.map((charge)=>
                                                    <option>{charge}</option>
                                                )} 
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Vitesse</Form.Label>
                                            <Form.Control as="select"
                                               value={vitesse}
                                               onChange={handleChangeDimension('vitesse')}
                                               >
                                                   <option>Tous</option>
                                                 {vitesses.map((vitesse)=>
                                                    <option>{vitesse}</option>
                                                )} 
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Marque</Form.Label>
                                            <Form.Control as="select"
                                               value={marque}
                                               onChange={handleChangeDimension('marque')}
                                               >
                                                    <option>Tous</option> 
                                                 {marques.map((marque)=>
                                                    <option>{marque}</option>
                                                )} 
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className='search-second-row'>
                                       <button className='search-button'>Rechercher</button>
                                    </div>
                                    </form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="vehicule">
                                <form>   
                                <div className='search-first-row'>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Marque</Form.Label>
                                            <Form.Control as="select"
                                               value={marqueV}
                                               onChange={handleChangeVehicule('marqueV')}
                                               >
                                                 {marqueVs.map((marque)=>
                                                    <option>{marque}</option>
                                                )} 
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Modele</Form.Label>
                                            <Form.Control as="select"
                                               value={modele}
                                               onChange={handleChangeVehicule('modele')}
                                               >
                                                 {modeles.map((modele)=>
                                                    <option>{modele}</option>
                                                )} 
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Motorisation</Form.Label>
                                            <Form.Control as="select"
                                               value={motorisation}
                                               onChange={handleChangeVehicule('motorisation')}
                                               >
                                                 {motorisations.map((motorisation)=>
                                                    <option>{motorisation}</option>
                                                )} 
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Annee</Form.Label>
                                            <Form.Control as="select"
                                               value={annee}
                                               onChange={handleChangeVehicule('annee')}
                                               >
                                                 {annees.map((annee)=>
                                                    <option>{annee}</option>
                                                )} 
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className='search-input' controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Taille</Form.Label>
                                            <Form.Control as="select"
                                               value={taille}
                                               onChange={handleChangeVehicule('taille')}
                                               >
                                                 {tailles.map((taille)=>
                                                    <option>{taille}</option>
                                                )} 
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className='search-second-row'>
                                       <button type='submit' className='search-button'>Rechercher</button>
                                    </div>
                                    </form> 
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container> 
                    </div>
                    <div className='item-6'></div>
                    <div className='item-7'>
                    <div className='coordonnee'>
                    <div className='card-coordonnee'>
                        <div className='card-col-1'>
                            <img
                                src={pneus}
                                width="98"
                                height="78"
                                className="logo"
                                alt="Logo Pneu service"
                            />
                        </div>
                        <div className='card-col-2'>
                            <p style={{fontSize:'1.3em', fontWeight:'800', color:'#888', margin:'0', fontFamily: 'MuseoModerno, cursive'}}>1.Choisissez vos pneus </p>
                            <p style={{fontSize:'1em', fontWeight:'600', color:'#999', fontFamily: 'MuseoModerno, cursive'}}>Parmi un large choix </p>
                        </div>
                    </div>
                    <div className='card-coordonnee'>
                        <div className='card-col-1'>
                            <img
                                src={commande}
                                width="88"
                                height="84"
                                className="logo"
                                alt="Logo Pneu service"
                            />
                        </div>
                        <div className='card-col-2'>
                        <p style={{fontSize:'1.3em', fontWeight:'800', color:'#888', margin:'0', fontFamily: 'MuseoModerno, cursive'}}>2.Faites votre commande.</p>
                            <p style={{fontSize:'1em', fontWeight:'600', color:'#999',fontFamily: 'MuseoModerno, cursive'}}>En precisant le nombre de pneu</p>
                        </div>
                    </div>
                    <div className='card-coordonnee'>
                        <div className='card-col-1'>
                            <img
                                src={payment}
                                width="83"
                                height="80"
                                className="logo"
                                alt="Logo Pneu service"
                            />
                        </div>
                        <div className='card-col-2'>
                        <p style={{fontSize:'1.3em', fontWeight:'800', color:'#888', margin:'0', fontFamily: 'MuseoModerno, cursive'}}>3.Payez à la livraison </p>
                            <p style={{fontSize:'1em', fontWeight:'600', color:'#999', fontFamily: 'MuseoModerno, cursive'}}>ou au centre de montage agrée.</p>
                        </div>
                    </div>
                </div>
                </div>
            </Styles>
        </React.Fragment>
    )
}
export default Header;

/**
 * <img
                            src={}
                            width="140"
                            height="65"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
 */