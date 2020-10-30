import React from "react";
import { Card, Container } from "react-bootstrap";
import styled from 'styled-components';


//components
import TableCommande from '../Components/TableCommande';


const Styles = styled.div`
 height:100%;
 padding:0.5% 1.5%;
  .table-commandes{
    padding: 1%;
    height:520px;
    background:white;
    overflow-y:auto;
    border-radius:15px;
    box-shadow:5px 10px 20px 1px rgba(0, 0, 0, 0.153);

    &::-webkit-scrollbar{
        width: 5px;
        height: 1%;
        background: #fff;
        border-radius:15px;
        margin-left: 2px;
    }

    &::-webkit-scrollbar-thumb{
        border-radius: 15px;
        background-color: #aaa;
    }

  }
`;


const Commande = () => {
    return(
        <React.Fragment>
            <Styles>
                <div className='table-commandes'>
                        <TableCommande/>
                </div>        
            </Styles>
        </React.Fragment>
        
        
    )
}

export default Commande;