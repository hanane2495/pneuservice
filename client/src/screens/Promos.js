import React, { useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Styles = styled.div`
background:#fff;
`;

function Promo(props) {
    let history = useHistory()

    useEffect(() => {
        props.setNavigation(history.location.pathname)
      }, []);
    return(
        <React.Fragment>
            <Styles>
            this is Promo page
            </Styles>
        </React.Fragment>
    )
}

export default Promo;