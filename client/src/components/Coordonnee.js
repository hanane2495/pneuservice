import React, { useEffect, useState} from 'react';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBRow, MDBTestimonial} from 'mdbreact';
import styled from 'styled-components'

//icons
import pneus_red from '../assets/pneus.png'
import commande_red from '../assets/commandes.png'
import payment_red from '../assets/payement.png'
import pneus_yellow from '../assets/pneus-jaune.png'
import commande_yellow from '../assets/commandes-jaune.png'
import payment_yellow from '../assets/payement-jaune.png'
import pneus_green from '../assets/pneus-vert.png'
import commande_green from '../assets/commandes-vert.png'
import payment_green from '../assets/payement-vert.png'
import pneus_orange from '../assets/pneus-orange.png'
import commande_orange from '../assets/commandes-orange.png'
import payment_orange from '../assets/payement-orange.png'


const Styles = styled.div`
    .coordonnee{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        width:100%;
        height:100%;
        padding: 2% 0;
    }
    .card-coordonnee{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        width:35%;
        height:100%;
        border-radius:10px;
    }
    .card-col-1{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        width:100%;
        height:100%;
        background:transparent;
        border-radius:50%
    }
    .card-col-2{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        width:100%;
        height:100%;
    }
    .card-col-3{
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        justify-content:center;
        width:5%;
        height:100%;
        padding-left:5%;
    }
`

const Coordonnee = (props) => {
    const [pneus, setPneus] = useState()
    const [commandes, setCommandes] = useState()
    const [payment, setPayment] = useState()

    useEffect(() => {
        if(props.type === 'poids-lourds'){
            setPneus(pneus_yellow)
            setCommandes(commande_yellow)
            setPayment(payment_yellow)
        }if(props.type === 'auto'){
            setPneus(pneus_red)
            setCommandes(commande_red)
            setPayment(payment_red)
        }if(props.type === 'agro'){
            setPneus(pneus_green)
            setCommandes(commande_green)
            setPayment(payment_green)
        }
        if(props.type === 'moto'){
            setPneus(pneus_orange)
            setCommandes(commande_orange)
            setPayment(payment_orange)
        }
    }, []);
    return(
        <Styles>
             <div className='coordonnee'>
                <div className='card-coordonnee'>
                    <div className='card-col-1'>
                        <h1 style={{fontSize:'6em', fontWeight:'200', color:`${props.color}`}}>01.</h1>
                        <img
                            src={pneus}
                            width="98"
                            height="78"
                            className="logo"
                            alt="Logo Pneu service"
                        />
                    </div>
                    <div className='card-col-2'>
                        <p style={{fontSize:'1.3em', fontWeight:'600', color:'#888', margin:'0', fontFamily: 'Roboto, sans-serif'}}>Choisissez vos pneus </p>
                        <p style={{fontSize:'1em', fontWeight:'600', color:'#999', fontFamily: 'Roboto, sans-serif'}}>Parmi un large choix </p>
                    </div>
                </div>
                <div className='card-coordonnee'>
                    <div className='card-col-1'>
                        <h1 style={{fontSize:'6em', fontWeight:'200', color:`${props.color}`}}>02.</h1>
                        <img
                            src={commandes}
                            width="88"
                            height="84"
                            className="logo"
                            alt="Logo Pneu service"
                        />
                    </div>
                    <div className='card-col-2'>
                    <p style={{fontSize:'1.3em', fontWeight:'600', color:'#888', margin:'0', fontFamily: 'Roboto, sans-serif'}}>Faites votre commande.</p>
                        <p style={{fontSize:'1em', fontWeight:'600', color:'#999',fontFamily: 'Roboto, sans-serif'}}>En precisant le nombre de pneu</p>
                    </div>
                </div>
                <div className='card-coordonnee'>
                    <div className='card-col-1'>
                        <h1 style={{fontSize:'6em', fontWeight:'200', color:`${props.color}`}}>03.</h1>
                        <img
                            src={payment}
                            width="83"
                            height="80"
                            className="logo"
                            alt="Logo Pneu service"
                        />
                    </div>
                    <div className='card-col-2'>
                    <p style={{fontSize:'1.3em', fontWeight:'600', color:'#888', margin:'0', fontFamily: 'Roboto, sans-serif'}}>Payez à la livraison </p>
                        <p style={{fontSize:'1em', fontWeight:'600', color:'#999', fontFamily: 'Roboto, sans-serif'}}>ou au centre de montage agrée.</p>
                    </div>
                </div>
            </div>
        </Styles>
    )
}

export default Coordonnee;
