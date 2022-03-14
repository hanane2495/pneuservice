import React, { useEffect, useState} from 'react';
import {Tab, Nav, Row, Col} from 'react-bootstrap'
import styled from 'styled-components';
import axios from 'axios'

import {MdModeEdit} from 'react-icons/md'

//components
import ModalModifierRec from '../Components/ModalModifierRec'

//image
import road from '../assets/road.jpg'

//images offre special
import pneu1_offre_special from '../assets/offre_special/ENERGY_SAVER.png'
import pneu2_offre_special from '../assets/offre_special/ENERGY_SAVER_HAXX.png'
import pneu3_offre_special from '../assets/offre_special/LATITUDE_ALPIN.png'
import pneu4_offre_special from '../assets/offre_special/PILOT_SPORT.png'
import pneu5_offre_special from '../assets/offre_special/PILOT_SPORT_3.png'

//images top ventes 
import pneu1_top_ventes from '../assets/top_vente/CONTI_SPORT_CONTACT_5_Continental.png'
import pneu2_top_ventes from '../assets/top_vente/ENERGY_SAVER_Michelin.png'
import pneu3_top_ventes from '../assets/top_vente/LATITUDE_ALPIN_Michelin.png'
import pneu4_top_ventes from '../assets/top_vente/STORMY_IRIS.jpg'
import pneu5_top_ventes from '../assets/top_vente/ZEON_4XS_Cooper.png'

//image vente budjet 
import pneu1_vente_budjet from '../assets/vente_budjet/CONTI_PREMIUM_CONTACT_6_Continental.png'
import pneu2_vente_budjet from '../assets/vente_budjet/CROSSCLIMATEHAXX_Michelin.png'
import pneu3_vente_budjet from '../assets/vente_budjet/DUELER_H_T_684_II_Bridgistone.png'
import pneu4_vente_budjet from '../assets/vente_budjet/PILOT_SPORT_4_Michelin.png'
import pneu5_vente_budjet from '../assets/vente_budjet/SCORPION_VERDE_ALL_SEASON_Pireli.png'

const Styles = styled.div`
background: -webkit-linear-gradient( rgba(255, 255, 255, 0.7) 100%,transparent 100%), url(${road});
background-attachment:fixed;
background-size:cover;
padding:0.1% 8%;
.recommandation{
  background:transparent;
  margin:5% 0;
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
.carousel-button{
    /*background : #EF1A23;*/
    border:none;
    color:white;
    width:70%;
    font-size:1.2em;
    font-weight:bold;
    border-radius:3px;
}
`;

function Recommandation(props) {

    const [modalModifierRec, setModalModifierRec] = useState(false)
    const [offre_speciale, setOffreSpeciale] = useState([])
    const [top_vente, setTop_vente] = useState([])
    const [pneus_budget, setPneus_budget] = useState([])

    const offre_speciale_content =[
        {
            image : pneu1_offre_special,
            name : 'ENERGY SAVER',
            marque : 'Michelin',
            prix : '2560.00 Dz'
        },
        {
            image : pneu2_offre_special,
            name : 'ENERGY SAVER HAXX',
            marque : 'Michelin',
            prix : '2560.00 Dz'
        },
        {
            image : pneu3_offre_special,
            name : 'LATITUDE_ALPIN',
            marque : 'Michelin',
            prix : '2560.00 Dz'
        },
        {
            image : pneu4_offre_special,
            name : 'PILOT SPORT',
            marque : 'Michelin',
            prix : '2560.00 Dz'
        },
        {
            image : pneu5_offre_special,
            name : 'PILOT SPORT 3',
            marque : 'Michelin',
            prix : '2560.00 Dz'
        }
    ]

    const top_ventes_content =[
        {
            image : pneu1_top_ventes,
            name : 'CONTI SPORT CONTACT 5',
            marque : 'Continental',
            prix : '2560.00 Dz'
        },
        {
            image : pneu2_top_ventes,
            name : 'ENERGY SAVER',
            marque : 'Michelin',
            prix : '2560.00 Dz'
        },
        {
            image : pneu3_top_ventes,
            name : 'LATITUDE ALPIN',
            marque : 'Michelin',
            prix : '2560.00 Dz'
        },
        {
            image : pneu4_top_ventes,
            name : 'STORMY',
            marque : 'IRIS',
            prix : '2560.00 Dz'
        },
        {
            image : pneu5_top_ventes,
            name : 'ZEON 4XS',
            marque : 'Cooper',
            prix : '2560.00 Dz'
        }
    ]

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
     
    const [key, setKey] = useState("offre speciale");
    const ActiveStyle = {
        textAlign: "center",
        background: `${props.rgb}`,
        color: "#fff",
        borderBottom:`solid 3px ${props.color}`,
        fontWeight:'600',
        fontSize:'1.5em',
        fontFamily:'Roboto, sans-serif ' 

    };
    const inActiveStyle = {
        ...ActiveStyle,
        background: "transparent",
        color: "#6E7888",
        fontWeight:'600',
        fontSize:'1.5em',
        fontFamily:'Roboto, sans-serif ' 
    };

    useEffect(() => {
        const categorie = props.page
        const caracteristique = key
        axios.post(`${process.env.REACT_APP_API_URL}/get/recommandation`, {categorie, caracteristique})
        .then(res => { 
            if(caracteristique === 'top vente'){
                setTop_vente(res.data)
            }else if(caracteristique === 'offre speciale'){
                setOffreSpeciale(res.data)
            }else if(caracteristique === 'pneus budget'){
                setPneus_budget(res.data)
            }
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
       }, [key]) 
 

    return (
        <React.Fragment>
            <Styles>
                <div className='recommandation'>
                    <Tab.Container 
                        id="controlled-tab-example" 
                        defaultActiveKey={key}
                        activeKey={key} 
                        onSelect={key => setKey(key)}
                    >
                        <Row >
                            <Col>
                                <Nav.Link  
                                    eventKey="offre speciale" 
                                    style={key === "offre speciale" ? ActiveStyle : inActiveStyle}
                                >
                                    Offre speciale
                                </Nav.Link>
                            </Col>
                            <Col>
                                <Nav.Link  
                                    eventKey="top vente" 
                                    style={key === "top vente" ? ActiveStyle : inActiveStyle}
                                >
                                    Top Vente
                                </Nav.Link>
                            </Col>
                            <Col>
                                <Nav.Link  
                                    eventKey="pneus budget" 
                                    style={key === "pneus budget" ? ActiveStyle : inActiveStyle}
                                >
                                    Pneus Budget
                                </Nav.Link>
                            </Col>
                        </Row>
                    <Tab.Content>
                        <Tab.Pane eventKey="offre speciale" >
                            <div className='recommandation-content'>
                                <div className='card-rec'>
                                    <img
                                        src={offre_speciale_content[0].image}
                                        alt="Logo Pneu service"
                                        height='200'
                                        width='150'
                                    />
                                    <div className='card-rec-right-col'>
                                        <p className='name'>{offre_speciale_content[0].name}</p>
                                        <p className='marque'>{offre_speciale_content[0].marque}</p>
                                        <p className='prix'>{offre_speciale_content[0].prix}</p>
                                        <button 
                                         onClick = {() => setModalModifierRec(true)}
                                         style={{background:`${props.color}`, width:'150px', height:'40px'}} className='carousel-button' type='button'><MdModeEdit/> Modifier</button>
                                    </div>
                                </div>
                                <div className='card-rec'>
                                    <img
                                        src={offre_speciale_content[1].image}
                                        alt="Logo Pneu service"
                                        height='200'
                                        width='150'
                                    />
                                    <div className='card-rec-right-col'>
                                        <p className='name'>{offre_speciale_content[1].name}</p>
                                        <p className='marque'>{offre_speciale_content[1].marque}</p>
                                        <p className='prix'>{offre_speciale_content[1].prix}</p>
                                        <button style={{background:`${props.color}`, width:'150px', height:'40px'}} className='carousel-button' type='button'><MdModeEdit/> Modifier</button>
                                    </div>
                                </div>
                                <div className='card-rec'>
                                    <img
                                        src={offre_speciale_content[2].image}
                                        alt="Logo Pneu service"
                                        height='200'
                                        width='150'
                                    />
                                    <div className='card-rec-right-col'>
                                        <p className='name'>{offre_speciale_content[2].name}</p>
                                        <p className='marque'>{offre_speciale_content[2].marque}</p>
                                        <p className='prix'>{offre_speciale_content[2].prix}</p>
                                        <button 
                                        onClick = {() => setModalModifierRec(true)}
                                        style={{background:`${props.color}`, width:'150px', height:'40px'}} className='carousel-button' type='button'><MdModeEdit/> Modifier</button>
                                    </div>
                                </div>
                                
                            </div> 
                        </Tab.Pane>
                        <Tab.Pane eventKey="top vente" >
                            <div className='recommandation-content'>
                                <div className='card-rec'>
                                    <img
                                    src={ top_ventes_content[0].image}
                                    alt="Logo Pneu service"
                                    height='200'
                                        width='150'
                                    />
                                    <div className='card-rec-right-col'>
                                        <p className='name'>{ top_ventes_content[0].name}</p>
                                        <p className='marque'>{ top_ventes_content[0].marque}</p>
                                        <p className='prix'>{ top_ventes_content[0].prix}</p>
                                        <button 
                                        onClick = {() => setModalModifierRec(true)}
                                        style={{background:`${props.color}`, width:'150px', height:'40px'}} className='carousel-button' type='button'><MdModeEdit/> Modifier</button>
                                    </div>
                                </div>
                                <div className='card-rec'>
                                    <img
                                    src={ top_ventes_content[1].image}
                                    alt="Logo Pneu service"
                                    height='200'
                                        width='150'
                                    />
                                    <div className='card-rec-right-col'>
                                        <p className='name'>{ top_ventes_content[1].name}</p>
                                        <p className='marque'>{ top_ventes_content[1].marque}</p>
                                        <p className='prix'>{ top_ventes_content[1].prix}</p>
                                        <button 
                                        onClick = {() => setModalModifierRec(true)}
                                        style={{background:`${props.color}`, width:'150px', height:'40px'}} className='carousel-button' type='button'><MdModeEdit/> Modifier</button>
                                    </div>
                                </div>
                                <div className='card-rec'>
                                    <img
                                    src={ top_ventes_content[2].image}
                                    alt="Logo Pneu service"
                                    height='200'
                                        width='150'
                                    />
                                    <div className='card-rec-right-col'>
                                        <p className='name'>{ top_ventes_content[2].name}</p>
                                        <p className='marque'>{ top_ventes_content[2].marque}</p>
                                        <p className='prix'>{ top_ventes_content[2].prix}</p>
                                        <button 
                                        onClick = {() => setModalModifierRec(true)}
                                        style={{background:`${props.color}`, width:'150px', height:'40px'}} className='carousel-button' type='button'><MdModeEdit/> Modifier</button>
                                    </div>
                                </div>
                                
                            </div> 
                        </Tab.Pane>
                        <Tab.Pane eventKey="pneus budget" >
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
                                        <button 
                                        onClick = {() => setModalModifierRec(true)}
                                        style={{background:`${props.color}`, width:'150px', height:'40px'}} className='carousel-button' type='button'><MdModeEdit/> Modifier</button>
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
                                        <button 
                                        onClick = {() => setModalModifierRec(true)}
                                        style={{background:`${props.color}`, width:'150px', height:'40px'}} className='carousel-button' type='button'><MdModeEdit/> Modifier</button>
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
                                        <button 
                                        onClick = {() => setModalModifierRec(true)}
                                        style={{background:`${props.color}`, width:'150px', height:'40px'}} className='carousel-button' type='button'><MdModeEdit/> Modifier</button>
                                     </div>
                                </div>
                                
                            </div> 
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container> 
                </div>
            </Styles>
            <ModalModifierRec
                show={modalModifierRec}
                onHide={() => setModalModifierRec(false)}
            />
        </React.Fragment>
    )
}

export default Recommandation


