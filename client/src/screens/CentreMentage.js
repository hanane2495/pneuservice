import React from 'react';
import styled from 'styled-components';

//components
import Navbar from '../components/Navbar'

const Styles = styled.div`
height:100vh;
`;

function CentreMentage(){
    return(
        <React.Fragment>
            <Navbar color='#262626'/> 
            <Styles></Styles>           
        </React.Fragment>
    )
}
export default CentreMentage; 
