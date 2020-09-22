import React, {useState, useEffect} from 'react';
import {useRouteMatch} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'
import {Form} from 'react-bootstrap'

//components
import Navbar from '../components/Navbar'

//icons
import {FaCloudShowersHeavy, FaGasPump, FaVolumeUp} from 'react-icons/fa'

//images
import default_img from '../assets/default_image.png'

//image vente budjet 
import pneu1_vente_budjet from '../assets/vente_budjet/CONTI_PREMIUM_CONTACT_6_Continental.png'
import pneu2_vente_budjet from '../assets/vente_budjet/CROSSCLIMATEHAXX_Michelin.png'
import pneu3_vente_budjet from '../assets/vente_budjet/DUELER_H_T_684_II_Bridgistone.png'
import pneu4_vente_budjet from '../assets/vente_budjet/PILOT_SPORT_4_Michelin.png'
import pneu5_vente_budjet from '../assets/vente_budjet/SCORPION_VERDE_ALL_SEASON_Pireli.png'

const Styles = styled.div`
    overflow-x:hidden;
/*------------details container---------------*/
.details-container{
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    padding:5%;
    height:100vh;
    width:100vw;
}
/**________________________________________________ */
.image-container{
    display:flex;
    flex-direction:column;
    width:30%;
    height:100%;
    border:1px solid #777
}

.active-image-container{
    display:flex;
    flex-direction:row;
    width:100%;
    height:80%;
}

.details-icons{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:20%;
    height:80%;
}

.icon{
    width:50px;
    height:50px;
    color:#999;
    margin:10%; 
    border:2px solid #999;
    padding:7%;
    border-radius:50%;
}

.image-pneu-container{
    width:80%;
    height:80%;
}

.image-pneu{
    height:100%;
}

.default-img{
    display:flex;
    justify-content: flex-end;
    position: relative;
    height:100%;
    width: 100%;
    color:#333;
}

.text {
    color: #000;
    font-size: 1.2em;
    font-weight:600;
}

.overlay {
    display:flex;
    justify-content:flex-end;
    align-items:center;
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
    padding-right:10%;
}

.image-marque-container{
    width:80%;
    display:flex;
    justify-content: center;
    align-items:center;
}

.image-marque{
    width:100%;
    height:100%;
}

.images-slider{
    display:flex;
    flex-direction:row;
    width:100%;
    height:20%;
}

.image-pneu-slide{
    width:70%;
    height:100%;
}

.slide{
    width:33%;
    height:100%;
    background:#eee;
    border: 1px solid #777;
}

.active-slide{
    display:flex;
    justify-content:center;
    align-items:center;
    width:38%;
    height:100%;
    border: 4px solid #F29F05;
}

/**_____________________________________________ */
.infos-container{
    width:40%;
    height:100%;
    padding: 0 3%;
}

.pneu{
    font-size:1.5em;
    font-weight:500;
    color:#444;

}

.dimension{
    font-size:1em;
    font-weight:500;
    color:#777;
    margin-bottom:5%;
}

.caracteristique{
    display:flex;
    flex-direction:row;
}

.titre{
    color:red;
    font-size:1em;
    margin-right:2%;
}

.paragraphe{
    color:#777;
    font-size:1.2em;
}

.titre-points-fort{
    color:#777;
    margin-top:5%
}

p{
    padding:0;
    margin:0;
}

ul{
    padding:0;
    margin:0;
}
/*______________________________________________*/
.commande-container{
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    width:20%;
    height:100%;
    background:#eee;
    padding:1%;
}

.quantite{
    display:flex;
    flex-direction:row;
    justify-content:center;
    width:100%;
    margin-top:3%;
}

.button-commande{
    border:none;
    border-radius: 5px;
    background:#F29F05;
    color:white;
    font-size:1em;
    font-weight:400;
    width:80%;
    height:auto;
    margin:5% 0;
    padding:5% 8%;
}
/*------------fin details container-----------*/
/*------------similar products---------------*/
.similar-products{
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
}
/*------------fin similar products------------*/
`;

function Detail(){
    let match = useRouteMatch();
    const [pneu, setPneu] = useState([])

    const vente_budjet_content =[
        {
            image : pneu1_vente_budjet,
            name : 'CONTI PREMIUM CONTACT 6',
            marque : 'Continental',
            prix : '2560.00 Dz'
        },
        {
            image : pneu2_vente_budjet,
            name : 'CROSSCLIMATEHAXX',
            marque : 'Michelin',
            prix : '2560.00 Dz'
        },
        {
            image : pneu3_vente_budjet,
            name : 'DUELER H T 684 II',
            marque : 'Continental',
            prix : '2560.00 Dz'
        },
        {
            image : pneu4_vente_budjet,
            name : 'PILOT SPORT',
            marque : 'Michelin',
            prix : '2560.00 Dz'
        },
        {
            image : pneu5_vente_budjet,
            name : 'SCORPION VERDE ALL SEASON',
            marque : 'Pireli',
            prix : '2560.00 Dz'
        }
    ]
    
    useEffect(() => {
        var id = match.params.id_pneu
        axios.post(`${process.env.REACT_APP_API_URL}/pneu/poids-lourds/details`, {
            id
        })
        .then(res => {
            console.log(res.data[0])
           setPneu(res.data[0])
        })
        .catch(err => {
            console.log(err)
        })
    }, []);
    return(
        <React.Fragment>
            <Navbar color='#262626'/>
            <Styles>
                <div className='details-container'>
                    <div className='image-container'>
                        <div className='active-image-container'>
                            <div className='details-icons'>
                            <FaGasPump className='icon' style={{fontSize :'1.8em', color:'#bbb', marginRight:'5%' }}/>
                            <FaCloudShowersHeavy className='icon' style={{fontSize :'1.8em', color:'#bbb', marginRight:'5%' }}/>
                            <FaVolumeUp className='icon' style={{fontSize :'1.8em', color:'#bbb', marginRight:'5%' }}/>
                            </div>
                            <div className='image-pneu-container'>
                            {pneu.image_url === null ? 
                                <div className='default-img'>
                                    <img
                                        src={`${default_img }`}
                                        className='image-pneu'
                                    />
                                    <div className="overlay">
                                        <div className="text">Image Non Disponible</div>
                                    </div>
                                </div>
                             :
                                <img
                                    src={`https://www.monsterstudio.org${pneu.image_url}`}
                                    className='image-pneu'
                                />
                            }
                            {pneu.marque_img === null ? null :
                                <div className='image-marque-container'>
                                    <img
                                        src={`https://www.monsterstudio.org${pneu.marque_img}`}
                                        className='image-marque'
                                    />
                                </div>
                            }
                            </div>
                        </div>
                        <div className='images-slider'>
                            <div className='active-slide'>
                                {pneu.image_url === null ? 
                                    <div className='default-img'>
                                        <img
                                            src={`${default_img }`}
                                            className='image-pneu-slide'
                                        />
                                        <div className="overlay">
                                            <div className="text-slide">Image Non Disponible</div>
                                        </div>
                                    </div>
                                :
                                    <img
                                        src={`https://www.monsterstudio.org${pneu.image_url}`}
                                        className='image-pneu-slide'
                                    />
                                }
                            </div>
                            <div className='slide'></div>
                            <div className='slide'></div>
                        </div>
                    </div>
                    <div className='infos-container'>
                        <p className='pneu'>Pneu {pneu.marque}{pneu.collection} </p>
                        <p className='dimension'>{pneu.largeur}/ {pneu.hauteur} R{pneu.diametre}  {pneu.charge} {pneu.vitesse}</p>
                        <div className='caracteristique'>
                            <p className='titre'>Gamme :</p>
                            <p className='paragraphe'>{pneu.type}</p>
                        </div>
                        <div className='caracteristique'>
                            <p className='titre'>Usage :</p>
                            <p className='paragraphe'>{pneu.position}</p>
                        </div>
                        <ul className='titre-points-fort'>Point Fort</ul>
                            <li className='point-forts'>Design optimise le grip et le drainage</li>
                            <li className='point-forts'>Carcasse renforcée dans les flancs</li>
                            <li className='point-forts'>Nouveau mélange de gomme</li>

                        <p className='titre-points-fort'>Description</p> 
                        <p>Elit esse mollit deserunt sunt ex consectetur voluptate mollit excepteur. Magna in anim ad esse laborum ullamco dolor sunt nisi anim. Elit culpa cupidatat incididunt quis ea consectetu. Veniam tempor pariatur eiusmod commodo irure exercitation sint eu ex est.</p>   
                    </div>
                    <div className='commande-container'>
                        {pneu.price > 0 ? 
                            <div>
                                <p style={{fontSize:'2.5em', fontWeight:'700', margin:'0', padding:'0', color:'#333'}}>{pneu.price} DA</p>   
                                <p style={{fontSize:'0.8em', fontWeight:'500', margin:'0', padding:'0', color:'#999'}}>prix unitaire HT</p>
                       
                            </div>       
                             :null}
                        <div className='quantite'>
                            <p style={{margin:'2%', color:'red'}}>quantite</p>
                            <Form>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Control as="select" custom>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </div>
                        <button className='button-commande'>{pneu.price > 0 ? 'Commander' : 'Demmander devis'}</button>

                    </div>
                </div>
                <div className='similar-products'></div>
            </Styles>            
        </React.Fragment>
    )
    
}
export default Detail; 