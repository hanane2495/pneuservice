import React from 'react'
import styled from 'styled-components';

//image
import livraison from '../assets/Livraison1.png'

const Styles = styled.div`
    .livraison_container{
       padding:50px 8%;
       display:flex;
       flex-direction:row;
       justify-content:center;
       align-items:center;
    }
    .left_side{
        width:50%;
        height:100%;
    }
    .right_side{
        width:50%;
        height:100%;
    }
`


function Livraison() {
    return (
        <React.Fragment>
            <div className='livraison_container'>
                <div className='left_side'>
                    <img alt='icon-livraison' src={`${livraison}`}/>
                </div>
                <div className='right_side'>
                    <h1>La livraison est gratuite à Oran. Bientôt dans d'autres wilayas !</h1>
                    <h2>La livraison se fait partout en ALGERIE.</h2>
                    <p>Pneuservice.dz travaille avec des transporteurs express de grandes notoriétés pour garantir des livraisons rapides et sûres sur l'intégralité du territoire national.</p>
                    <p>Vous pouvez à tout moment consulter le suivi de votre livraison en appelant au 0560.66.99.99</p>
                    <p>Si vous avez des questions sur notre service de livraison, n'hésitez pas à nous contacter.</p>
                    <p>Délais de livraison : <br/>1 à 2 jours pour Oran. <br/>2 à 5 jours pour les autres villes.</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Livraison