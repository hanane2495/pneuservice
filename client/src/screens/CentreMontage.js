import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {InputGroup, Accordion, Card,  Button} from 'react-bootstrap'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

//components
import Navbar from '../components/Navbar'

//images 
import map from '../assets/map2.jpg'
import garage from '../assets/garage.jpg'

//icons
import {FiSearch} from 'react-icons/fi'
import {BsCheckCircle} from 'react-icons/bs'


const Styles = styled.div`
    height:100%;
    display: grid;
    grid-template-columns: 1fr repeat(12, minmax(auto, 4.2rem)) 1fr;
    grid-template-rows:5.8rem 28.5rem 5rem;
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
         background: -webkit-linear-gradient( rgba(0, 0, 0, 0.7) 100%,transparent 100%), url(${map});
         background-size:cover;
         align-items:center;
         justify-content:flex-end;
         box-shadow:50px rgba(0,0,0, 0.253);
    }
    .info-promo{
       width:100%;
       height: 100%;
       display:flex;
       flex-direction:column;
       justify-content:center;
       align-items:center;
       color: white;
    }
    .promo-right-side{
        display:flex;
        width: 60%;
        height: 100%;
        background: -webkit-linear-gradient( rgba(0, 0, 0, 0.4) 100%,transparent 100%), url(${garage});
        background-size:cover;
        align-items:center;
        justify-content:flex-start;
    }
    a{
        color:white;
        text-decoration:none;
    }
    .input-group {
      width:80%;
      height:9vh;
      margin-bottom:10px;
    }
    .form-control{
      height:100%;
    }
    #free-solo-demo{
        background-color:#fff !important;
    }

    div.MuiAutocomplete-root{
        width:90% !important;
        background-color : #fff !important;
        border-radius:3px !important;
    }
`;

const ContentStyles = styled.div`
  padding:5%;

  .cm-card{
      display:flex;
      flex-direction:row;
      justify-content:left;
      align-items:stretch;
  }
  .Coordonnee{
      width: 30%;
  }

  .prix{
      width: 20%;
  }

  .pneu{
      width:20%
  }
`;

function CentreMentage(){
    const useMountEffect = fun => useEffect(fun, []);
    const myRef = useRef(null);
    const [ville, setVille] =useState('')
    const [centreMontage, setCentreMontage] = useState([])
    const [villes, setVilles] = useState([
        {ville : 'Oran'},
        {ville : 'Alger'},
        {ville : 'Tlemcen'},
        {ville : 'Sidi-belabes'},
        {ville : 'Mostaganem'},
        {ville : 'Ain Temouchent'},
        {ville : 'Mascara'},
        {ville : 'Tiaret'},
        {ville : 'El-chlef'},
        {ville : 'Relizene'},
        {ville : 'Saida'},
        {ville : 'El-Eulma'},
        {ville : 'Annaba'},
        {ville : 'Constantine'},
        {ville : 'Ourgla'}
    ])

    //handle change from inputs
    const onVilleChange = (event, values) => {
        setVille(values)
        console.log(values)
      }

    const executeScroll = () => myRef.current.scrollIntoView({ block: 'start',  behavior: 'smooth' })
    useMountEffect(executeScroll);


      function handleSearch(){
        axios.post(`${process.env.REACT_APP_API_URL}/get/centre/montage`, {ville})
        .then(res => {
            console.log(ville)
            console.log(res.data)
            setCentreMontage(res.data)
            executeScroll()
        })
        .catch(err => {
            console.log(err)
        })
      }

    return(
        <React.Fragment>
            <Styles>
                <div className='navbar-item'>
                    <Navbar bg="none" variant="light"/>
                </div>
                <div className='promo-item'>
                    <div className='promo-left-side'>
                        <div className='info-promo'>
                            <div style={{width:'80%', display:'flex', justifyContent:'left'}}>
                               <h5 style={{textAlign:'left'}}>Rechercher un centre de montage</h5>
                            </div>
                            <InputGroup >
                                <Autocomplete
                                    id="free-solo-demo"
                                    onChange = {onVilleChange}
                                    options={villes.map((option) => option.ville)}
                                    renderInput={(params) => (
                                    <TextField {...params} placeholder="Ville (ex : Oran, Alger...)" margin="none" variant="outlined" style={{padding:'0'}}/>
                                    )}
                                />
                                <InputGroup.Append>
                                   <Button variant="outline-secondary" onClick={handleSearch}>
                                       <FiSearch/>
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <div style={{width:'80%', display:'flex', justifyContent:'left'}}>
                               <h9 style={{textAlign:'center', padding:'0 5px'}}>Trouver le centre de montage pneu qui vous convient parmi les meilleurs centres en Algerie...</h9>
                            </div>
                        </div>
                    </div>
                    <div className='promo-right-side'>
                    
                    </div>
                </div>
            </Styles>     
            <ContentStyles ref={myRef}>
                <h1 style={{color:'#555'}}>Nos Centre de Montage</h1>
                <p>Pneu service vous propose un service apres vente complet<br/>
                Pneuservice.dz est partenaire avec des garages monteurs de pneus a Oran et sur Alger (bientôt d'autres wilayas ) !
                Lorsque vous passez votre commande,les pneus sont livrés directement chez le centre de montage agréé par Pneuservice.dz dans votre ville.</p>

                <p>Une fois vous recevez vos pneus, vous pouvez vous présenter avec votre numéro de facture au centre de montage que vous aurez choisis pour monter vos pneus.
                    Les frais du montage n'est pas inclus dans le prix affichés (sauf promotion),ils peuvent varier d'un centre à un autre.</p>

                <div className = 'resultat'>
                    <h2 style={{color:'#555'}}>{centreMontage.length} resultats pour la recherche : {ville}</h2>
                    <hr/>
                    {centreMontage.map((cm) => 
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <div className='cm-card'>
                                        <div className='Coordonnee'>
                                            <h5 style={{color:'#f00'}}>{cm.nom}</h5>
                                            <h6>{cm.adresse}</h6>
                                            <h6>Tel : {cm.telephone}</h6>
                                        </div>
                                        <div className='prix'>
                                            <h6> A partir de</h6>
                                            <h2>2570 DZD</h2>
                                        </div>
                                        <div className='pneu'>
                                            <h6>Diametre max</h6>
                                            <h2>18"</h2>
                                        </div>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                             Plus de Details
                                        </Accordion.Toggle>
                                    </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <div>
                                        <div>
                                            <h4>Horaire d'ouverture</h4>
                                            <h6>En semaine : 8H30-12H30 / 14H-18H</h6>
                                            <h6>Jeudi : 8H30-12H30</h6>
                                            <h6>Vendredi : Fermé</h6>
                                        </div>
                                        <div>
                                            <hr/>
                                            <h4>Service</h4>
                                             <p><BsCheckCircle/> Montage</p>
                                             <p><BsCheckCircle/> Equilibrage</p>
                                             <p><BsCheckCircle/> Parallelisme</p>
                                             <p><BsCheckCircle/> Reparation</p>

                                        </div>
                                    </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    )}
                    
                </div>
            </ContentStyles>      
        </React.Fragment>
    )
}
export default CentreMentage; 
