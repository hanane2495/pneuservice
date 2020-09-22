import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Container } from "react-bootstrap";

//components
import Chart1 from './Components/Chart1'
import Chart2 from "./Components/Chart2";
import Chart3 from "./Components/Chart3";
import Aside from './Components/Aside';


const Styles = styled.div`
 height:100%;
  .home-layout{
    display: grid;
    height:100%;
    grid-template-areas:
        'chart-1 chart-1 aside'
        'chart-2 chart-3 aside';
     grid-template-rows: 60% 40%;
     grid-template-columns: 40% 40% 20%;
     padding:1% 1% 1% 2% ;
     transition:0.9s;
  }
  .main-toggled{
      height: 100vh;
      display: grid;
      justify-self:center;
      grid-template-areas:
        'asideLeft nav nav'
        'asideLeft main asideRight';
     grid-template-rows: 60% 40%;
     grid-template-columns: 40% 40% 20%;
     transition:  0.9s ;
    -moz-transition:  0.9s ; /* Firefox 4 */
    -webkit-transition: 0.9s ; /* Safari 和 Chrome */
    -o-transition: 0.9s ; /* Opera */
     background:#fff;
     }
  
  .graphique-1{
    grid-area: chart-1;
    justify-content:center;
    justify-items:center;
    align-items:center;
    padding: 0 1% 1% 0;
  }
  .graphique-2{
    grid-area: chart-2;
    justify-content:center;
    justify-items:center;
    align-items:center;
    padding:0 3%;
    padding-left:0;
  }
  .graphique-3{
    grid-area: chart-3;
    justify-content:center;
    justify-items:center;
    align-items:center;
    padding:0 2%;
  }
  .card-graphique{
      height: 100%;
      width:100%;
      padding-left: 2%;
      border-radius:10px;
      box-shadow:5px 10px 20px 1px rgba(0, 0, 0, 0.153);
  }
  .aside{
    grid-area: aside;
    height:100%;
  }   
`;




const Dashboard = (props) => {
    const mainToggle = (toggle) => {
        setToggleMain(!toggleMain)
        console.log('main toggle clicked');
        const Mygrid = document.getElementById('acceuil-grid');
        console.log(Mygrid.className)
        
        if(Mygrid.className ==='home-layout' ){
          Mygrid.classList.replace('home-layout','main-toggled');
          console.log(Mygrid.className)
        }else{
          Mygrid.classList.replace('main-toggled' ,'home-layout');
          console.log(Mygrid.className)
      }
      
      }
    const [toggleMain, setToggleMain] = useState(false)

    return(
        <React.Fragment>
            <Styles>
                <div className='home-layout' id='acceuil-grid'>
                    <div className='graphique-1'>
                        <Card className='card-graphique'>
                            <Chart1/>
                        </Card>
                    </div>    
                    <div className='graphique-2'>
                        <Card className='card-graphique'>
                            <Chart2/>
                        </Card>
                    </div>
                    <div className='graphique-3'>
                        <Card className='card-graphique' style={{paddingRight:'1%'}}>
                            <Chart3/>
                        </Card>
                    </div>
                    <div className='aside'>
                        <Aside mainClosed={props.closed}/>
                    </div>
                </div>
                
            </Styles>
        </React.Fragment>
        
    )
}

export default Dashboard;