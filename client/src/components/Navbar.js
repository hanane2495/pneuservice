import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

//logo
import logo from '../assets/logo-rouge-blanc.png'

//images
import dark from '../assets/dark1.jpg'

const Styles = styled.div`

.NavbarItems{
    width:100vw;
    height:11vh;
    padding:0 2%;
    transition:0.9s;
    display:flex;
    flex-direction:row;
    align-items:center;

    @media only screen and(max-width: 1090px) {
    position: relative;
    background:rgb(0,0,0, 0.2);
  }
}

.scrolled{ 
    position : fixed;
    background: #262626 /*url(${dark})*/;
    background-size:cover;
    width:100vw;
    padding:0 2%;
    z-index:11;
    transition:0.9s;
    @media only screen and (max-width: 1090px) {
          width:100vw;
      }
   }

.logo{
    width:12%;
    height:80%;
    justify-self:start;
    @media only screen and (max-width: 1090px) {
        width:15%;
        height:80%;
        
    }
    @media only screen and (max-width: 780px) {
        width:20%;
        height:80%;   
    }
    @media only screen and (max-width: 480px) {
        width:35%;
        height:80%;   
    }
} 

.menu-icon{
    color:white;
    font-size:1.5rem;
    display:none;
    @media only screen and (max-width: 1090px) {
        display:block;
        position:absolute;
        top:0;
        right:0;
        transform:translate(-100%, 40%);
        cursor:pointer;
    }
}  

.nav-menu{
   display:flex;
   flex-direction:row;
   justify-content:center;
   align-items:center;
   width:88%;
   height:100%;
   list-style:none;
   margin : 0;
   @media only screen and (max-width: 1090px) {
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100%;
    height:70vh;
    position:absolute;
    top:11vh;
    left:-100%;
    opacity:1;
    transition: all 0.5s ease;
    }
}

.nav-menu.active{
    @media only screen and (max-width: 1090px) {
          background:rgb(0,0,0, 0.3);
          left:0;
          opacity:1;
          transition: all 0.5s ease;
          z-index: 1;
          padding:0;
    }
}

.left-side{
    display:grid;
    grid-template-columns:repeat(2, auto);
    width:30%;
    height:100%;
    justify-content:center;
    align-items:center;
    @media only screen and (max-width: 1090px) {
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        width:100%;
        height:30%;
    }
}

.right-side{
    display:grid;
    grid-template-columns:repeat(5, auto);
    width:70%;
    height:100%;
    justify-content:center;
    align-items:center;
    @media only screen and (max-width: 1090px) {
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        width:100%;
        height:70%;
    }
}

.navbar-link{
    padding:1.5rem 1rem;
    color:white;
    font-weight:500;
    list-style:none;
    &:hover{
        background:rgb(255,255,255, 0.5);
        transition: all 0.3s ease-out;
    }
    @media only screen and (max-width: 1090px) {
        text-align:center;
        display:table;
        margin:0;
        padding:5% 0;
        width:100%;
    }
}

a{
    color:white;
    text-decoration:none;
}

`;

function NavBar(props) {

    const [clicked, setClicked] =  useState(false)
    //search styling
    const [key, setKey] = useState("auto");
    const ActiveStyle = {
        fontSize:'1em',
        fontFamily:'NTR, sans-serif ' ,
    };
    const inActiveStyle = {
        ...ActiveStyle,
        background:'#666',
        color: "white",
        fontSize:'1em',
        fontFamily:'NTR, sans-serif ' 

    };

    useEffect(
        () => {
            window.addEventListener('scroll', () => {
                const isTop = window.scrollY > 0;
                const nav = document.getElementById('nav');
                if (isTop){
                    nav.classList.add('scrolled');
                }else{
                    nav.classList.remove('scrolled');
                }
            })
            return () => {
                //window.removeEventListener('scroll')
            }
        }, []
    );

    return(
        <React.Fragment>
            <Styles>
                <nav className='NavbarItems' id='nav' style={{background :`${props.color}`}}>
                    <img className='logo' src={`${logo}`}/>
                    <div className='menu-icon'>
                         <i onClick={() => setClicked(!clicked)} className={clicked ? 'fas fa-times' : "fas fa-bars"}></i>
                    </div>
                    <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                        <div className='left-side'>
                            <li className=' navbar-link'><Link  to='/promos'>Promo</Link></li>
                            <li className=' navbar-link'><Link  to='/centre-de-mentage'>Montage</Link></li>
                        </div>
                        <div className='right-side'>
                            <li className=' navbar-link'><Link  to='/'>Pneu Auto</Link></li>
                            <li className=' navbar-link'><Link  to='/pneu-moto'>Pneu Moto</Link></li>
                            <li className=' navbar-link'><Link  to='/pneu-poids-lourds'>Pneu Poids Lourds</Link></li>
                            <li className=' navbar-link'><Link  to='/pneu-agricole'>Pneu Agricole</Link></li>
                        </div>
                    </ul>

                </nav>
            </Styles>
        </React.Fragment>
    )
}

export default NavBar;


/**
 * <Nav id='left-nav' className="mr-auto" activeKey={key} onSelect={(key) => {setKey(key); alert(`selected ${key}`)}}>
                            <Nav.Link 
                                className='promo-link'
                                eventKey="promo" 
                                style={key === "promo" ? ActiveStyle : inActiveStyle}
                            >
                                <Link className='navbar-links' to='/promos'>Promo</Link></Nav.Link>
                            <Nav.Link 
                                eventKey="montage" 
                                style={key === "montage" ? ActiveStyle : inActiveStyle}
                            >
                                <Link className='navbar-links' >Montage</Link></Nav.Link>
                        </Nav>
                        <Nav className="ml-auto" activeKey={key} onSelect={(key) => {setKey(key); alert(`selected ${key}`)}}>
                            <Nav.Link 
                               eventKey="auto" 
                               style={key === "auto" ? ActiveStyle : inActiveStyle}
                            >
                                <Link className='navbar-links' to='/'>Pneu Auto</Link>
                            </Nav.Link>
                            <Nav.Link 
                                eventKey="moto" 
                                style={key === "moto" ? ActiveStyle : inActiveStyle}
                            >
                                <Link className='navbar-links' to='/pneu-moto'>Pneu Moto</Link>
                            </Nav.Link>
                            <Nav.Link 
                                eventKey="genie-civil" 
                                style={key === "genie-civil" ? ActiveStyle : inActiveStyle}
                            >
                                <Link className='navbar-links' >Pneu Genie Civile</Link>
                            </Nav.Link>
                            <Nav.Link 
                                eventKey="pds-lourd" 
                                style={key === "pds-lourd" ? ActiveStyle : inActiveStyle}
                            >
                                <Link className='navbar-links' to='/pneu-poids-lourds'>Pneu Poids Lourds</Link>
                            </Nav.Link>
                            <Nav.Link 
                                eventKey="agricole" 
                                style={key === "agricole" ? ActiveStyle : inActiveStyle}
                            >
                                <Link className='navbar-links' to='/pneu-agro'>Pneu Agricole</Link>
                            </Nav.Link>
                        </Nav>
 */