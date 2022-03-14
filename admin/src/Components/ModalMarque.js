import React,{ useState} from "react";
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
    height:20vh;
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

  const [formDataImagePneu, setFormDataImagePneu] = useState(null)

  const [images, setImages] = useState({
      image_pneu : `${props.images.marque_img}`
  })

  const [Image_marque_updated, setImage_marque_updated] = useState(false)


  const uploadMarque = (e) => {
    const data = new FormData()
    data.append('name', e.target.files[0].name)
    data.append('categorie', props.categorie)
    data.append('marque', props.marque)
    data.append('categoryImage', e.target.files[0])
    setFormDataImagePneu(data)
    setMessage1(e.target.files[0].name)
};


// Submit fichier stock
const handleSubmitMarque = (e) => {
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
    axios.post(`${process.env.REACT_APP_API_URL}/update/marque`, formDataImagePneu, options)
    .then((res) => {
      //get data from server 
      setTimeout(() => {
        setImages({marque_img : res.data.marque_img})
        console.log(res.data)
        setImage_marque_updated(true)
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
               Modifier l'image de la marque         
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Styles >
            <div classname= 'container-left'>
                 {Image_marque_updated ? <img src={`${process.env.REACT_APP_API_URL}/${images.marque_img}`} className='image'/> :<img src={`${process.env.REACT_APP_API_URL}/${props.images.marque_img}`} className='image'/>}            
            </div>
            <div classname= 'container-right'>
            <form onSubmit={handleSubmitMarque}>
                    <Form style={{marginBottom:'5%'}}>
                        <Form.File 
                        id="custom-file"
                        label={message1}
                        custom
                        onChange={uploadMarque}
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
                    <Button type='submit' variant="contained" style={{background:'#5C73F2', color:'white'}}>
                    Envoyer
                    </Button>
                </form>
            </div>
          </Styles>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  