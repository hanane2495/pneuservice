import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import styled from 'styled-components'


//component 
import TableMarque from '../Components/TableMarque'


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
`;


const Pneu = () => {
    return(
        <React.Fragment>
            <Styles>
            <div className='pneu-tab-container'>
              <Tabs defaultActiveKey="pneu-auto" id="uncontrolled-tab-example" >
                    <Tab eventKey="pneu-auto" title="Marque Auto" >
                        <div className='tab-container'>
                            <TableMarque categorie = 'pneu auto'/>
                        </div>
                    </Tab>
                    <Tab eventKey="pneu-moto" title="Marques Moto" >
                    <div className='tab-container'>
                            <TableMarque categorie = 'pneu moto'/>
                        </div>
                    </Tab>
                    <Tab eventKey="pneu-pds-lrd" title="Marques Poids lourd" >
                        <div className='tab-container'>
                            < TableMarque categorie = 'pneu pl'/>
                        </div>
                    </Tab>
                    <Tab eventKey="pneu-ag" title="Marques Agricole" >
                        <div className='tab-container'>
                            <TableMarque categorie = 'pneu agricole'/>
                        </div>
                    </Tab>
              </Tabs>   
            </div>
            </Styles>
        </React.Fragment>
        
        
    )
}

export default Pneu;