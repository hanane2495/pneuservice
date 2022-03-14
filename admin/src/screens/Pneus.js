import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import styled from 'styled-components'


//component 
import TablePneu from '../Components/TablePneuAuto'
import TablePneuAgricole from '../Components/TablePneuAgricole'
import TablePneuMoto from '../Components/TablePneuMoto'
import TablePneuPL from '../Components/TablePneuPL'


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
                    <Tab eventKey="pneu-auto" title="Pneu Auto" >
                        <div className='tab-container'>
                            <TablePneu />
                        </div>
                    </Tab>
                    <Tab eventKey="pneu-moto" title="Pneu Moto" >
                    <div className='tab-container'>
                            <TablePneuMoto/>
                        </div>
                    </Tab>
                    <Tab eventKey="pneu-pds-lrd" title="Pneu Poids lourds" >
                        <div className='tab-container'>
                            < TablePneuPL />
                        </div>
                    </Tab>
                    <Tab eventKey="pneu-ag" title="Pneu Agricole" >
                        <div className='tab-container'>
                            <TablePneuAgricole />
                        </div>
                    </Tab>
              </Tabs>   
            </div>
            </Styles>
        </React.Fragment>
        
        
    )
}

export default Pneu;