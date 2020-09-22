import React from 'react';
import styled from 'styled-components';
import { motion} from "framer-motion";


//logo
import logo from '../assets/PneuS-03.png'

//image 
import mail from '../assets/Mail.png'
import facebook from '../assets/Facebook.png'
import phone from '../assets/phone.png'
import pneus from '../assets/pneus.png'
import commande from '../assets/commandes.png'
import payment from '../assets/payement.png'
import right from '../assets/right.png'



const Styles = styled.div`
display:flex;
flex-direction:column;
align-items:center;
height:60vh;
font-size:16px;
.presentation{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    background-color:#eee;
    width:100%;
    height:30%;
    padding: 2% 0;
}
.coordonnee{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    width:100%;
    height:50%;
    padding: 0 2%;
    margin-top:1%;
}
.card-coordonnee{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    width:35%;
    height:100%;
    margin:0 2%;
    border-radius:10px;
}
.card-col-1{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:25%;
    height:60%;
    background: #fff;
    border-radius:50%
}
.card-col-2{
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:center;
    width:65%;
    height:100%;
    padding-left:5%;
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
.commentaire{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    width:100%;
    height:19%;
    padding: 0 2%;
    margin-top:1%;
    background:rgba(199, 7, 7, 0.75)
}
`;
function underHeader() {
    return(
        <React.Fragment>
            <Styles>
                
                <motion.div 
                   className='coordonnee'
                   initial={{opacity : 0, scale:0}}
                   animate = {{opacity : 1, scale:1}}
                   transition={{ ease: "easeOut", duration: 2 }}
                   >
                    <div className='card-coordonnee'>
                        <div className='card-col-1'>
                            <img
                                src={pneus}
                                width="70"
                                height="58"
                                className="logo"
                                alt="Logo Pneu service"
                            />
                        </div>
                        <div className='card-col-2'>
                            <p style={{fontSize:'1.3em', fontWeight:'600', color:'#999', margin:'0'}}>Choisissez vos pneus </p>
                            <p style={{fontSize:'0.8em', fontWeight:'500', color:'#555'}}>Parmi un large choix </p>
                        </div>
                        <div className='card-col-3'>
                            <img
                                src={right}
                                width="70"
                                height="58"
                                className="logo"
                                alt="Logo Pneu service"
                            />
                        </div>
                    </div>
                    <div className='card-coordonnee'>
                        <div className='card-col-1'>
                            <img
                                src={commande}
                                width="68"
                                height="64"
                                className="logo"
                                alt="Logo Pneu service"
                            />
                        </div>
                        <div className='card-col-2'>
                        <p style={{fontSize:'1.3em', fontWeight:'600', color:'#999', margin:'0'}}>Faites votre commande.</p>
                            <p style={{fontSize:'0.8em', fontWeight:'500', color:'#555'}}>En precisant le nombre de pneu</p>
                        </div>
                        <div className='card-col-3'>
                            <img
                                src={right}
                                width="70"
                                height="58"
                                className="logo"
                                alt="Logo Pneu service"
                            />
                        </div>
                    </div>
                    <div className='card-coordonnee'>
                        <div className='card-col-1'>
                            <img
                                src={payment}
                                width="63"
                                height="60"
                                className="logo"
                                alt="Logo Pneu service"
                            />
                        </div>
                        <div className='card-col-2'>
                        <p style={{fontSize:'1.3em', fontWeight:'600', color:'#999', margin:'0'}}>Payez à la livraison </p>
                            <p style={{fontSize:'0.8em', fontWeight:'500', color:'#555'}}>ou au centre de montage agrée.</p>
                        </div>
                    </div>
                </motion.div>
                <div className='commentaire'>
                    <p style={{fontSize:'1.2em', fontWeight:'600', color:'#fff', margin:'0'}}>Vous changez quand vos pneus ? </p>
                </div>
                
            </Styles>
        </React.Fragment>
    )
}

export default underHeader;

/**
 * <div className='presentation'>
                   <img
                        src={logo}
                        width="120"
                        height="50"
                        className="logo"
                        alt="Logo Pneu service"
                    />
                    <p style={{fontSize:'1.2em', fontWeight:'500', color:'#888'}}>Leader de la vente en ligne des pneus multimarque en Algérie.</p>
                </div>



                <div className='presentation'>
                    <p style={{fontSize:'1.2em', fontWeight:'500', color:'#888', marginRight:'0.5%'}}>Le pneu pas cher avec </p> 
                    <p style={{fontSize:'1.2em', fontWeight:'700', color:'rgba(199, 7, 7, 0.85)'}}>Pneuservice</p>
                    <p style={{fontSize:'1.2em', fontWeight:'500', color:'#888'}}>, Leader de la vente en ligne des pneus multimarque en Algérie.</p>
                </div>
 */