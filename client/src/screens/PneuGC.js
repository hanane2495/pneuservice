import React, { useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Styles = styled.div`
background:#fff;
`;

function PneuGC(props) {
    let history = useHistory()

    useEffect(() => {
        props.setNavigation(history.location.pathname)
      }, []);
    return(
        <React.Fragment>
            <Styles>
                <section className='section1'>
                    <div >
                        Promo
                    </div>
                    <div className='recherche'>
                        Recherche 
                    </div>
                </section>
                <section className='section1'>
                    <div>
                        slider promo
                    </div>
                </section>
            </Styles>
        </React.Fragment>
    )
}

export default PneuGC;