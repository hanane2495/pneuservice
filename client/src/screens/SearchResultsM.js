import React, {useState, useEffect} from 'react';
import {Link, useRouteMatch} from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios';


//components
import Navbar from '../components/Navbar'


//icons
import {FaCloudShowersHeavy, FaGasPump, FaVolumeUp, FaLink} from 'react-icons/fa'

//images
import default_img from '../assets/default_image.png'
import adherence from '../assets/adherence.jpg'
import carburant from '../assets/carburant.jpg'

const Styles = styled.div`
   padding : 5% 8%;
   scroll-behavior: smooth;

   .resultat{
    display:flex;
    flex-direction:row;
   }
   
   .Right-side{
     display:flex;
     flex-direction:column;
     width:75%;
   }

   .Left-side{
     width:25%;
     padding:1% 1% 3% 0;
   }

   
   .sticky {
    position: fixed;
    top: 0;
   }
   .image-adherence{
       width:100%;
       border-radius:10px;
       margin-bottom:5%;
   }
`;

const Card_pneu = styled.div`
    display:flex;
    flex-direction: row;
    align-items:center;
    box-shadow:5px 10px 20px 1px rgba(0,0,0, 0.253);
    border-radius:10px;
    margin: 1% 0;
    height:180px;
    width:100%;

    .card-img{
        display:flex;
        flex-direction:column;
        width:15%;
    }
    .default-img{
        position: relative;
        height:100%;
        width: 100%;
        color:#333;
    }
    .card-info-1{
        margin: 0 2% 0 5%;
        width:35%;
    }
    .card-info-2{
        display:flex;
        flex-direction:row;
    }
    .card-info-3{
        display:flex;
        flex-direction:column;
        justify-content:flex-end;
        align-items:center;
        font-family: 'Heebo', sans-serif;
        color:#555;
        padding-bottom:5%;
        width:20%;
        height:90%;
    }
    .overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        opacity: 0.7;
        transition: .5s ease;
        background-color: #fff;
    }
    .overlay-1{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        transition: .5s ease;
    }
    .text {
        color: #000;
        font-size: 1em;
        font-weight:600;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
    }
    .promotion{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        border-radius: 50%;
        background:#A7BF73;
        width:40px;
        height:40px;
        color:white;
        align-self:flex-start;
        justify-self:flex-start;
    }
    .price{
        display:flex;
        flex-direction:row;
    }
    .card-info-4{
        display:flex;
        flex-direction:column;
        width: 20%;

    }
    .details{
        color: #FF7103;
        font-size:1.2em;
        font-weight:500;
        text-align:center;
        background:transparent;
        border: 2px solid #FF7103;
        text-decoration:none;
        padding : 5%;
        border-radius:50px;
        margin-bottom:2%;
        width:100%;
    }
    .acheter{
        color:white;
        font-size:1.2em;
        font-weight:500;
        text-align:center;
        background:#FF7103;
        border: 1px solid;
        text-decoration:none;
        padding: 5%;
        border-radius:50px;
        margin-bottom:2%;
        width:100%;
    }
`;

function SearchResult(){   
    let match = useRouteMatch();
    const [resultat, setResultat] = useState([])

    useEffect(() => {
        var largeur = match.params.largeur
        var hauteur = match.params.hauteur
        var diametre = match.params.diametre
        var charge = match.params.charge
        var vitesse = match.params.vitesse
        var type = match.params.type
        var position = match.params.position
        var marque = match.params.marque

        axios.post(`${process.env.REACT_APP_API_URL}/moto/search/pneus`, {
            largeur, hauteur, diametre, charge, vitesse, type, position, marque
        }).then(res => {
               setResultat(res.data)
               console.log(res.data)
        }).catch(err => {
              console.log(err)
        }) 
       
    }, []);
    
    function handleDetails(item){
           window.localStorage.setItem('pneu_x', item)
    }

    return(
        <React.Fragment>
            <Navbar color='#262626'/>
            <Styles> 
    <h5 style={{fontWeight:'600', color:'#444'}}>Notre selection de pneus : {match.params.largeur}/{match.params.hauteur} R{match.params.diametre} {match.params.charge} {match.params.vitesse}</h5>
                <hr/>
                <div className='resultat'>
                <div className=' Left-side' id='mySidebar'>
                        <img
                            src={`${adherence}`}
                            className='image-adherence'
                        />
                        <img
                            src={`${carburant}`}
                            className='image-adherence'
                        />
                </div>
                <div className='Right-side'>
                    {resultat.map( (res) => 
                    <Card_pneu>
                        <div className='card-img'>
                            {res.image_pneu === null ? 
                            <div className='default-img'>
                            <img
                                src={`${default_img }`}
                                width='130'
                                height='180'
                                className='image'
                            />
                            <div className="overlay">
                                    {res.image_marque === null ? null :
                                        <img
                                            src={`https://www.monsterstudio.org${res.image_marque}`}
                                            width='150'
                                            height='30'
                                        />
                                    }
                                    <div className="text">Image Non Disponible</div>
                                </div>
                            </div>
                            :
                            <div className='default-img'>
                                <img
                                    src={`https://www.monsterstudio.org${res.image_pneu}`}
                                    width='130'
                                    height='180'
                                    className='image'
                                />
                                <div className="overlay-1">
                                    {res.image_marque === null ? null :
                                        <img
                                            src={`https://www.monsterstudio.org${res.image_marque}`}
                                            width='150'
                                            height='30'
                                        />
                                    }
                                </div>
                            </div> 
                            }
                        </div>
                        <div className='card-info-1'>
                        <p style={{fontSize :'1.3em', fontWeight:'700', color:'#444', margin:'0', padding:'0'}}>{res.collection}</p>
                        <p style={{fontSize :'1em', fontWeight:'600', color:'#444',margin:'0', padding:'0' }}>{res.largeur}/{res.hauteur} R{res.diametre} {res.charge} {res.vitesse}</p>
                        <p style={{fontSize :'1em', fontWeight:'600', color:'#444', margin:'0', padding:'0' }}>Type de pneu : {res.type}</p>
                        <div className='card-info-2'>
                            <FaGasPump style={{fontSize :'1.8em', color:'#999', marginRight:'5%' }}/>
                            <p>{res.carburant}</p>
                            <FaCloudShowersHeavy style={{fontSize :'1.8em', color:'#999', marginRight:'5%' }}/>
                            <p>{res.adherence}</p>
                            <FaVolumeUp style={{fontSize :'1.8em', color:'#999', marginRight:'5%' }}/>
                                <p>{res.bruit}</p>
                        </div>
                        </div>
                        <div className = 'card-info-3'>
                            {res.price > 0 ? 
                            <div>
                            <div className='price'>
                                <div className='promotion'>
                                    <p style={{paddingTop:'15px'}}>50%</p>
                                </div>
                                <p style={{fontSize:'0.8em', fontWeight:'600', margin:'0', padding:'0', textDecoration:'line-through'}}>{res.price} DA</p>
                            </div>
                            <p style={{fontSize:'1.5em', fontWeight:'600', margin:'0', padding:'0'}}>{res.price} DA</p>
                            </div>
                           :null}
                        </div>
                        <div className = 'card-info-4'>
                            <Link to={`/details/pneu/moto/${res.pneu_id}/${res.designation}`} className='details' onClick={() => {handleDetails(JSON.stringify(res))}}>Details</Link>
                            {res.price > 0 ?  
                                <Link className='acheter'>Commander</Link> :
                                <Link className='acheter'>Demander Devis</Link>
                            }
                        
                        </div>
                    </Card_pneu>
                    )}            
                </div>
                </div>
        </Styles>
        </React.Fragment>
    )
}

export default SearchResult;

/**
 * 
 * 
 */