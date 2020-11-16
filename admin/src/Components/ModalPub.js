import React, {useState, useEffect} from "react";
import {Modal, Button, Form} from 'react-bootstrap'
import styled from 'styled-components'
import axios from 'axios'

const FormStyle = styled.form`
    display:flex;
    flex-direction:column;
    width:100%;
    height:200px;
    .form-row-1{
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        width:100%;
    }

    .form-input-1{
        width:45%;
        height:50px;
        margin: 1.5%;
        padding:2%;
    }

    .form-input-2{
        width:93%;
        height:50px;
        margin: 1%;
        padding:2%;
    }

    .form-row-2{
        display:flex;
        flex-direction:row;
        justify-content:flex-end;
        align-items:flex-end;
        width:100%;
        margin:5% 2% 0 0;
    }

    .form-button{
        padding:1.5% 5%;
        margin:2%;
        border-radius:5px;
        border:none;
    }
`;

export default function MyVerticallyCenteredModalStock(props) {

    //upload stock
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState({
    found: false,
    message: '',
  });
  const [message, setMessage] = useState('cliquer pour inserer')
  const [formDataImage, setFormDataImage] = useState(null)

  const upload = (e) => {
    const data = new FormData()
    data.append('page_name', props.page_name)
    data.append('categoryImage', e.target.files[0])
    data.append('name', e.target.files[0].name)
    setFormDataImage(data)
    setMessage(e.target.files[0].name)
  };

  // Submit fichier stock
  const handleSubmit = (e) => {
    e.preventDefault(); // do not refresh page 
    setProgressPercent(0);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setProgressPercent(percent);
      },
    };

    //send data to server   
    axios.post(`${process.env.REACT_APP_API_URL}/update/image`, formDataImage, options)
    .then((res) => {
      //get data from server 
      setTimeout(() => {
        console.log(res.data)  
        setProgressPercent(0);
        setMessage('Envoyé')
      }, 1000);
    })

    //handle errors
    .catch((err) => {
      console.log(err.rresponse);
      setTimeout(() => {
        setError({
          found: false,
          message: '',
        });
        setMessage(err.rresponse)
        setProgressPercent(0);
      }, 3000);
    });
    };
  
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Changer photo publicitaire ! 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FormStyle>
          <form onSubmit={handleSubmit}>
           <h5>Inserer une image</h5>
           <Form style={{marginBottom:'5%'}}>
            <Form.File 
              id="custom-file"
              label={message}
              custom
              onChange={upload}
            />
              <div className='progress mb-3 w-100'>
                <div
                  className='progress-bar'
                  role='progressbar'
                  style={{ width: `${progressPercent}%`, height:'20px'}}
                  aria-valuenow={progressPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                {progressPercent}
              </div>
              </div>
           </Form>
            <Button type='submit' variant="contained" color="primary">
              Envoyer
              </Button>
            </form>
        </FormStyle>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  

  