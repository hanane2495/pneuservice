import React, {useState, useEffect} from "react";
import { Card, Button } from "react-bootstrap";
import styled from 'styled-components';
import axios from 'axios'

import default_pub from '../assets/background1.jpg'

import MyVerticallyCenteredModal from '../Components/ModalPub'


const Styles = styled.div`
 height:100%;
  .pub-layout{
    display: grid;
    height:100%;
    grid-template-areas:
        'title-com'
        'table-com';
     grid-template-rows: 10% 90%;
     grid-template-columns: 100%;
     padding:1% 1% 0 2% ;
     transition:0.9s;
  }
  .titre-pub{
    grid-area: title-com;
    justify-content:center;
    justify-items:center;
    align-items:center;
    padding:0 1.5%;
    padding-left:0;
  }
  .pub{
    grid-area: table-com;
    justify-content:center;
    justify-items:center;
    align-items:center;
    padding: 1.5%;
    padding-left:0;

    
  }
  .card-pub{
    display: grid;
    grid-template-columns: auto auto auto;
      height: 100%;
      width:100%;
      padding-left: 2%;
      padding-top:0.5%;
      border-radius:10px;
      box-shadow:5px 10px 20px 1px rgba(0, 0, 0, 0.153);

      overflow-y:auto;

      &::-webkit-scrollbar{
      width: 5px;
      height: 1%;
      background: #fff;
      }

      &::-webkit-scrollbar-thumb{
      border-radius: 15px;
      background-color: #aaa;
      }
  }
    .grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
    background-color: #2196F3;
    padding: 10px;
  }
  .grid-item {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.8);
    padding: 20px;
    font-size: 30px;
    text-align: center;
  }
  
`;


const Pub = () => {

  const [modalShowStock, setModalShowStock] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);

    const [pages, setPages] = useState([])
    const [page_name, setPage_name] = useState(null)

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/get/image`)
        .then(res => { 
          setPages(res.data)
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      }, []) 

    return(
        <React.Fragment>
            <Styles>
            <div className='pub-layout'>
                <div className='titre-pub'>
                    <Card className='card-pub'>
                        <p style={{fontSize:'1.2rem', fontWeight:'500', color:'#999', marginTop:'0.5%'}}>Mes Promos</p>
                    </Card>
                </div>
                <div className='pub'>
                    <Card className='card-pub'>
                      {pages.map((page) =>
                        <Card style={{ width: '18rem', height: '25rem', margin:'8px'}}>
                          <Card.Img variant="top" src={page.image_url ? `http://localhost:5000/${page.image_url}` : default_pub} />
                          <Card.Body>
                              <Card.Title>{page.page_name}</Card.Title>
                              <Card.Text>
                                 Vous pouvez changer la photo publicitaire en cliquant sur le bouton ci-dessous
                              </Card.Text>
                              <Button 
                                variant="danger"
                                onClick = {() => {setModalShowStock(true); setPage_name(page.page_name)}}
                              >
                                  Changer photo !
                              </Button>
                          </Card.Body>
                        </Card>
                      )}
                        
                    </Card>
                </div>        
            </div>

            <MyVerticallyCenteredModal
            show={modalShowStock}
            onHide={() => setModalShowStock(false)}
            page_name = {page_name}
            />
            </Styles>

        </React.Fragment>
        
        
    )
}

export default Pub;