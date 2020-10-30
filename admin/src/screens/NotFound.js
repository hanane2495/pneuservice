import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const Styles = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
color:#666;
background:#eee;
font-size:28px;
width:100vw;
height:100vh;

.erreur{
    font-family: 'Secular One', sans-serif;
    font-size:8em;
    margin:0;
    padding:0;
    height: 40vh;
}

.oups{
    font-family: 'Raleway', sans-serif;
    font-size : 2em;
}

.home-link{
    font-family: 'Raleway', sans-serif;
    font-size : 1em;
    color:red;
    margin-top:20px;
}
`;


function NotFound() {

    return (
        <React.Fragment>
            <Styles>
                <p className='erreur'>404</p>
                <p className = 'oups'>Oups ! Page introubale</p>
                <p >
                    <Link className = 'home-link' to='/'>Allez à la page d'acceuil !</Link>
                </p>
            </Styles>
        </React.Fragment>
    )
}

export default NotFound;