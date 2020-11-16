import React from "react";
import { Card } from "react-bootstrap";
import styled from 'styled-components';
import TablePromo from '../Components/TablePromo'


const Styles = styled.div`
 height:100%;
  .pub-layout{
    display: grid;
    height:100%;
    grid-template-areas:
        'title-com'
        'table-com';
     grid-template-rows: 10% 90%;
     grid-template-columns: 100%;
     padding:1% 1% 0 2% ;
     transition:0.9s;
  }
  .titre-pub{
    grid-area: title-com;
    justify-content:center;
    justify-items:center;
    align-items:center;
    padding:0 1.5%;
    padding-left:0;
  }
  .pub{
    grid-area: table-com;
    justify-content:center;
    justify-items:center;
    align-items:center;
    padding: 1.5%;
    padding-left:0;

  }
  .card-pub{
      display:flex;
      flex-direction: row;
      justify-content:left;
      height: 100%;
      width:100%;
      padding-left: 2%;
      padding-top:0.5%;
      border-radius:10px;
      box-shadow:5px 10px 20px 1px rgba(0, 0, 0, 0.153);
  }
  
`;


const Pub = () => {

    return(
        <React.Fragment>
            <Styles>
            <div className='pub-layout'>
                <div className='titre-pub'>
                    <Card className='card-pub'>
                        <p style={{fontSize:'1.2rem', fontWeight:'500', color:'#999', marginTop:'0.5%'}}>Mes Promos</p>
                    </Card>
                </div>
                <div className='pub'>
                    <Card className='card-pub'>
                            <TablePromo/>
                    </Card>
                </div>        
            </div>
            </Styles>
        </React.Fragment>
        
        
    )
}

export default Pub;