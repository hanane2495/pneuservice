import React,{ useState, useEffect} from "react";
import {Modal, Button, Form} from 'react-bootstrap'
import styled from 'styled-components';
import axios from 'axios'



const Styles = styled.div`
 display:flex;
 flex-direction:row;
 justify-content:left;
 align-items:center; 
  .container-left{
   width:30vw;
   height:30vh;
  }
  .container-right{
    width:10vw;
    height:30vh;
    padding:0 20px;
  }
  .image{
    width:20vw;
    height:35vh;
    margin-right:20px;
  }
`;



export default function MyVerticallyCenteredModalImage(props) {

    //upload stock
  const [progressPercent1, setProgressPercent1] = useState(0);

  const [error, setError] = useState({
    found: false,
    message: '',
  });
  const [message1, setMessage1] = useState('cliquer pour inserer')
  const [resultat, setResultat] = useState('')

  const [formDataImagePub, setFormDataImagePub] = useState(null)

  const [Image_pub_updated, setImage_pub_updated] = useState(false)


  const uploadImagePub = (e) => {
    const data = new FormData()
    data.append('image_name', e.target.files[0].name)
    data.append('categoryImage', e.target.files[0])
    data.append('id_image_pub', props.id_image)
    setFormDataImagePub(data)
    setMessage1(e.target.files[0].name)
};


// Submit image pub
const handleSubmitImagePub = (e) => {
    e.preventDefault(); // do not refresh page 
    setProgressPercent1(0);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setProgressPercent1(percent);
      },
    };

    //send data to server   
    axios.post(`${process.env.REACT_APP_API_URL}/update/image/pub`, formDataImagePub, options)
    .then((res) => {
      //get data from server 
      setTimeout(() => {
        console.log(res.data)
        setImage_pub_updated(true)
        setResultat(res.data.message)
        setProgressPercent1(0);
        setMessage1('Envoyé')
      }, 1000);
    })

    //handle errors
    .catch((err) => {
      console.log(err.response);
      setTimeout(() => {
        setError({
          found: false,
          message: '',
        });
        setMessage1(err.response)
        setProgressPercent1(0);
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
               Modifier le Slide           
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Styles >
            <form onSubmit={handleSubmitImagePub}>
                <Form style={{marginBottom:'5%'}}>
                    <Form.File 
                    id="custom-file"
                    label={message1}
                    custom
                    onChange={uploadImagePub}
                    />
                    <div className='progress mb-3 w-100'>
                        <div
                        className='progress-bar'
                        role='progressbar'
                        style={{ width: `${progressPercent1}%`, height:'20px'}}
                        aria-valuenow={progressPercent1}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        >
                        {progressPercent1}
                    </div>
                    </div>
                </Form>
                {Image_pub_updated ? <h5 style={{color:'green'}}>{resultat}</h5> : null}
                <Button type='submit' variant="contained" style={{background:'#5C73F2', color:'white'}}>
                Envoyer
                </Button>
            </form> 
          </Styles>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  