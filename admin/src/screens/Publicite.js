import React, {useState, useEffect} from "react";
import { Card, Button, Tab, Tabs } from "react-bootstrap";
import styled from 'styled-components';
import axios from 'axios'

import default_pub from '../assets/background1.jpg'

import AjouterSlide from '../Components/ModalAjouterSlide'
import Carousel from '../Components/PubCarousel'
import Recommandation from '../Components/Recommandation'

import {IoIosAddCircleOutline} from 'react-icons/io'

const Styles = styled.div`
 height:100%;
 padding:1% 1% 1% 2%;
 .pneu-tab-container{
     border-radius:15px;
     box-shadow:5px 10px 20px 1px rgba(0, 0, 0, 0.153);
     height:500px;
     background:none;
     overflow-y:auto;

     &::-webkit-scrollbar{
    width: 5px;
    height: 1%;
    background: #fff;
    }

    &::-webkit-scrollbar-thumb{
    border-radius: 15px;
    background-color: #aaa;
    }
 }
  .tab-container{
      height:auto;
      padding:1%;
  }
  a{
        font-weight: 500;
        font-size:1rem;
        color: red;
  }
  .add-button{
    height : 50px;
    width : 200px;
    background : rgba(255, 255, 255, 0.3);
    border: 3px solid green;
    border-radius: 10px;
    color:green;
    margin : 10px 0;
  }
  
`;


const Pub = () => {

  
  const [modalAjouterSlide, setModalAjouterSlide] = useState(false)

  const [pages, setPages] = useState([])
  const [page_name, setPage_name] = useState('pneu auto')

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  

    return(
        <React.Fragment>
          <Styles>
            <div className='pneu-tab-container'>
              <Tabs defaultActiveKey="pneu-auto" id="uncontrolled-tab-example" >
                    <Tab eventKey="pneu-auto" title="Page Auto" >
                        <div className='tab-container'>
                           <h5 style={{textAlign:'center', color:'#555', marginTop:'20px'}}>Images Publicitaires</h5>
                           <hr/>
                           <button onClick = {()=>{setPage_name('pneu auto'); setModalAjouterSlide(true)}} className='add-button'><IoIosAddCircleOutline style={{marginRight:'5px'}}/>Ajouter un Slide</button>
                           <Carousel page='pneu auto'/>

                           <h5 style={{textAlign:'center', color:'#555', marginTop:'20px'}}>Recommandations</h5>
                           <hr/>
                           <Recommandation page='pneu auto' color='#EF1A23' rgb='rgb(255,0,0, 0.5)'/>
                        </div>
                    </Tab>
                    <Tab eventKey="pneu-moto" title="Page Moto" >
                      <div className='tab-container'>
                      <h5 style={{textAlign:'center', color:'#555', marginTop:'20px'}}>Images Publicitaires</h5>
                           <hr/>
                           <button onClick = {()=>{setPage_name('pneu moto'); setModalAjouterSlide(true)}} className='add-button'><IoIosAddCircleOutline style={{marginRight:'5px'}}/>Ajouter un Slide</button>
                           <Carousel page='pneu moto'/>

                           <h5 style={{textAlign:'center', color:'#555', marginTop:'20px'}}>Recommandations</h5>
                           <hr/>
                           <Recommandation page='pneu moto' color='#FF7103' rgb='rgb(255,113,3, 0.5)'/>
                      </div>
                    </Tab>
                    <Tab eventKey="pneu-pds-lrd" title="Page Poids lourds" >
                        <div className='tab-container'>
                           <h5 style={{textAlign:'center', color:'#555', marginTop:'20px'}}>Images Publicitaires</h5>
                           <hr/>
                           <button onClick = {()=>{setPage_name('pneu poids lourds'); setModalAjouterSlide(true)}} className='add-button'><IoIosAddCircleOutline style={{marginRight:'5px'}}/>Ajouter un Slide</button>
                           <Carousel page='pneu poids lourds'/>

                           <h5 style={{textAlign:'center', color:'#555', marginTop:'20px'}}>Recommandations</h5>
                           <hr/>
                           <Recommandation page='pneu poids lourds' color='#F29F05' rgb='rgb(255,197,41, 0.5)'/>
                        </div> 
                    </Tab>
                    <Tab eventKey="pneu-ag" title="Page Agricole" >
                        <div className='tab-container'>
                           <h5 style={{textAlign:'center', color:'#555', marginTop:'20px'}}>Images Publicitaires</h5>
                           <hr/>
                           <button onClick = {()=>{setPage_name('pneu agricole'); setModalAjouterSlide(true)}} className='add-button'><IoIosAddCircleOutline style={{marginRight:'5px'}}/>Ajouter un Slide</button>
                           <Carousel page='pneu agricole'/>

                           <h5 style={{textAlign:'center', color:'#555', marginTop:'20px'}}>Recommandations</h5>
                           <hr/>
                           <Recommandation page='pneu agricole' color='#4F7302' rgb='rgba(79,115,2, 0.5)'/>
                        </div>
                    </Tab>
                    <Tab eventKey="cv" disabaled title="condition de vente">
                        <div className='tab-container'>
                           <h5 style={{textAlign:'center', color:'#555', marginTop:'20px'}}>Images Publicitaires</h5>
                           <hr/>
                           <button onClick = {()=>{setPage_name('pneu auto'); setModalAjouterSlide(true)}} className='add-button'><IoIosAddCircleOutline style={{marginRight:'5px'}}/>Ajouter un Slide</button>
                           <Carousel page='pneu auto'/>

                           <h5 style={{textAlign:'center', color:'#555', marginTop:'20px'}}>Recommandations</h5>
                           <hr/>
                           <Recommandation page='pneu auto' color='#EF1A23' rgb='rgb(255,0,0, 0.5)'/>
                        </div>
                    </Tab>
                    <Tab eventKey="ml" title="Mentions Legales">
                        <div className='tab-container'>
                            
                        </div>
                    </Tab>
              </Tabs>   
            </div>
          </Styles>
          <AjouterSlide
            show={modalAjouterSlide}
            onHide={() => setModalAjouterSlide(false)}
            page = {page_name}
          />
        </React.Fragment>  
    )
}

export default Pub;


