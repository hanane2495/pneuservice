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
    border: 4px solid red;
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
    background:linear-gradient(90.84deg, #EF1A23 0.61%, #FB3C29 99.42%);
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
        axios.post(`${process.env.REACT_APP_API_URL}/pneu/details`, {
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
                            <p className='paragraphe'>competition</p>
                        </div>
                        <div className='caracteristique'>
                            <p className='titre'>Usage :</p>
                            <p className='paragraphe'>trackday (semi-slick)</p>
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

/**
 * 
    {pneu.adherence}
    {pneu.carburant}
    {pneu.bruit}

    {pneu.designation_pneu}
    {pneu.marque}
    {pneu.type} 
    
    
    <div className='product-container'>
                <div className='left-side'>
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
                <div className='right-side'>
                <p className='designation'>Pneu {pneu.marque}{pneu.collection} </p>
                    <div className='info-container'>
                            <p className='titre'>Dimension</p>
                            <p className='caracteristique'>{pneu.largeur}/ {pneu.hauteur} R{pneu.diametre}  {pneu.charge} {pneu.vitesse}</p>
                            {pneu.price > 0 ? 
                                
                                  <p style={{fontSize:'2.5em', fontWeight:'600', margin:'0', padding:'0', color:'#555'}}>{pneu.price} DA</p>
                                
                            :null}
                            <p className='titre'>Gamme</p>
                            <p className='caracteristique'>competition</p>
                            <p className='titre'>Usage</p>
                            <p className='caracteristique'>trackday (semi-slick)</p>
                            <ul className='titre'>Point Fort</ul>
                            <li className='point-forts'>Design optimise le grip et le drainage</li>
                            <li className='point-forts'>Carcasse renforcée dans les flancs</li>
                            <li className='point-forts'>Nouveau mélange de gomme</li>
                            <button className='button-commande'>{pneu.price > 0 ? 'Commander' : 'Demmander devis'}</button>
                        </div>
                        
                    </div>  
                </div>
                <div className='produits-similaires'>
                    <hr/>
                    <p className='titre-similar-products'>Produit similaires</p>
                    <div className='recommandation-content'>
                    <div className='card-rec'>
                                    <img
                                    src={vente_budjet_content[0].image}
                                    alt="Logo Pneu service"
                                    height='200'
                                        width='150'
                                    />
                                    <div className='card-rec-right-col'>
                                        <p className='name'>{vente_budjet_content[0].name}</p>
                                        <p className='marque'>{vente_budjet_content[0].marque}</p>
                                        <p className='prix'>{vente_budjet_content[0].prix}</p>
                                        <button className='carousel-button' type='button'>Voir</button>
                                    </div>
                                </div>
                                <div className='card-rec'>
                                    <img
                                    src={vente_budjet_content[1].image}
                                    alt="Logo Pneu service"
                                    height='200'
                                        width='150'
                                    />
                                    <div className='card-rec-right-col'>
                                        <p className='name'>{vente_budjet_content[1].name}</p>
                                        <p className='marque'>{vente_budjet_content[1].marque}</p>
                                        <p className='prix'>{vente_budjet_content[1].prix}</p>
                                        <button className='carousel-button' type='button'>Voir</button>
                                    </div>
                                </div>
                                <div className='card-rec'>
                                    <img
                                    src={vente_budjet_content[2].image}
                                    alt="Logo Pneu service"
                                    height='200'
                                        width='150'
                                    />
                                     <div className='card-rec-right-col'>
                                        <p className='name'>{vente_budjet_content[2].name}</p>
                                        <p className='marque'>{vente_budjet_content[2].marque}</p>
                                        <p className='prix'>{vente_budjet_content[2].prix}</p>
                                        <button className='carousel-button' type='button'>Voir</button>
                                     </div>
                                </div>
                    </div>
                </div> 



                display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding:3% 0;
margin:0 10%;

.product-container{
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:flex-start;
    height:65vh;
}

.left-side{
    padding-right:10%;
    width:50%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:flex-end;
}

.image-pneu{
    width:50%;
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
    width:100%;
    display:flex;
    justify-content: flex-end;
}

.image-marque{
    width:50%;
    height:20%;
}

.right-side{
    width:50%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:flex-start;
}
p{
    padding:0;
    margin:0
}

ul{
    padding:0;
    margin:0;
}

.info-container{
    display:flex;
    flex-direction:row;
    width:90%;
}

.info{
    width:50%;
    height:100%
}


.designation{
    font-size:1.3em;
    font-weight:500;
    color:#333;
    height:10%;
}

.titre{
    color:red;
    font-weight:500;
}

.caracteristique{
    font-size:1.2em;
    font-weight:400;
    color:#222;
}

.point-forts{
   font-size:0.8em;
}

.button-commande{
    border:none;
    border-radius: 5px;
    background:linear-gradient(90.84deg, #EF1A23 0.61%, #FB3C29 99.42%);
    color:white;
    font-size:1em;
    font-weight:400;
    width:auto;
    height:auto;
    margin:5% 0;
    padding:5% 8%;
}

.price-container{
    display:flex;
    flex-direction:column;
    height:100%;
    width:50%;
    padding-top:15%;
    padding-left:8%;
}

.promotion{
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius: 50%;
    background:#A7BF73;
    width:60px;
    height:60px;
    color:white;
}
.price{
    display:flex;
    flex-direction:row;
}

.carousel-button{
    background : #EF1A23;
    border:none;
    color:white;
    width:70%;
    font-size:1.2em;
    font-weight:bold;
}

.titre-similar-products{
    font-size:2em;
    color:red;

}

.recommandation-content{
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    width: 100%;
    height:250px;
    margin-bottom:10%;
    margin-top:5%;
}
.card-rec{
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
    width:33%;
    height:100%;
    margin:1%;
    background:#F5F5F5;
    border-radius:10px;
    box-shadow:5px 10px 20px 1px rgba(0,0,0, 0.253);
}
.card-rec-right-col{
    display:flex;
    flex-direction:column;
    text-align:left;
    padding-top:15%;
    height:100%;
}
.name{
   font-size:1em;
   font-weight:bold;
   color:#666;
   margin:0;
   padding:0;
}
.marque{
    font-size:1em;
   font-weight:bold;
   color:#333;
   margin:0;
   padding:0;
}
.prix{
    font-size:1.2em;
   font-weight:bold;
   color:#555;
   margin:0;
   padding:0;
}
 */