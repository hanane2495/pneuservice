import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import styled from 'styled-components'


//component 
import TablePneu from './Components/TablePneuAuto'


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
                    <Tab eventKey="pneu-auto" title="Pneu Aoto" >
                        <div className='tab-container'>
                            <TablePneu />
                        </div>
                    </Tab>
                    <Tab eventKey="pneu-moto" title="Pneu Moto" disabled>
                        <h1>I'm pneu Moto</h1>
                    </Tab>
                    <Tab eventKey="pneu-pds-lrd" title="Pneu Poids lourds" disabled>
                        <h1>i'm disabled</h1>
                    </Tab>
                    <Tab eventKey="collections" title="Collections" disabled>
                        <h1>i'm collections</h1>
                    </Tab>
                    <Tab eventKey="marques" title="Marques" disabled>
                        <h1>i'm marques</h1>
                    </Tab>
              </Tabs>   
            </div>
            </Styles>
        </React.Fragment>
        
        
    )
}

export default Pneu;