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
  const [progressPercent2, setProgressPercent2] = useState(0);
  const [progressPercent3, setProgressPercent3] = useState(0);

  const [error, setError] = useState({
    found: false,
    message: '',
  });
  const [message1, setMessage1] = useState('cliquer pour inserer')
  const [message2, setMessage2] = useState('cliquer pour inserer')
  const [message3, setMessage3] = useState('cliquer pour inserer')

  const [formDataImagePneu, setFormDataImagePneu] = useState(null)
  const [formDataImage1, setFormDataImage1] = useState(null)
  const [formDataImage2, setFormDataImage2] = useState(null)

  const [images, setImages] = useState({
    image_pneu : '',
    image_1 : '',
    image_2 : ''
  })

  const [Image_pneu_updated, setImage_pneu_updated] = useState(false)
  const [Image_1_updated, setImage_1_updated] = useState(false)
  const [Image_2_updated, setImage_2_updated] = useState(false)



  const uploadPneu = (e) => {
    const data = new FormData()
    data.append('name', e.target.files[0].name)
    data.append('categorie', props.categorie)
    data.append('collection', props.collection)
    data.append('collectionImage', e.target.files[0])
    setFormDataImagePneu(data)
    setMessage1(e.target.files[0].name)
};

const upload1 = (e) => {
    const data = new FormData()
    data.append('name', e.target.files[0].name)
    data.append('categorie', props.categorie)
    data.append('collection', props.collection)
    data.append('collectionImage', e.target.files[0])
    setFormDataImage1(data)
    setMessage2(e.target.files[0].name)

};

const upload2 = (e) => {
    const data = new FormData()
    data.append('name', e.target.files[0].name)
    data.append('categorie', props.categorie)
    data.append('collection', props.collection)
    data.append('collectionImage', e.target.files[0])
    setFormDataImage2(data)
    setMessage3(e.target.files[0].name)

};



useEffect(() => {
  console.log(props.images.image_pneu)
  console.log(images)
  }, [images]) 

// Submit fichier stock
const handleSubmitPneu = (e) => {
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
    axios.post(`${process.env.REACT_APP_API_URL}/update/image/pneu`, formDataImagePneu, options)
    .then((res) => {
      //get data from server 
      setTimeout(() => {
        setImages({...images, image_pneu : res.data.image_pneu})
        setImage_pneu_updated(true)
        console.log(res.data)
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
        setMessage2(err.rresponse)
        setProgressPercent1(0);
      }, 3000);
    });
    };

    const handleSubmit1 = (e) => {
        e.preventDefault(); // do not refresh page 
        setProgressPercent2(0);
        const options = {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            setProgressPercent2(percent);
          },
        };
    
        //send data to server   
        axios.post(`${process.env.REACT_APP_API_URL}/update/image_1`, formDataImage1, options)
        .then((res) => {
          //get data from server 
          setTimeout(() => {
            console.log(res.data)
            setImages({...images, image_1 : res.data.image_pneu})
            setImage_1_updated(true)
            setProgressPercent2(0);
            setMessage2('Envoyé')
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
            setMessage2(err.rresponse)
            setProgressPercent2(0);
          }, 3000);
        });
        };


        const handleSubmit2 = (e) => {
            e.preventDefault(); // do not refresh page 
            setProgressPercent3(0);
            const options = {
              onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                setProgressPercent3(percent);
              },
            };
        
            //send data to server   
            axios.post(`${process.env.REACT_APP_API_URL}/update/image_2`, formDataImage2, options)
            .then((res) => {
              //get data from server 
              setTimeout(() => {
                console.log(res.data)
                setImages({...images, image_2 : res.data.image_pneu})
                setImage_2_updated(true)
                setProgressPercent3(0);
                setMessage3('Envoyé')
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
                setMessage3(err.rresponse)
                setProgressPercent3(0);
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
               Modifier les images de la colection          
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Modifier l'image du pneu</h5>
          <Styles >
            <div classname= 'container-left'>
              {Image_pneu_updated ? <img src={`${process.env.REACT_APP_API_URL}/${images.image_pneu}`} className='image'/> :<img src={`${process.env.REACT_APP_API_URL}/${props.images.image_pneu}`} className='image'/>}
            </div>
            <div classname= 'container-right'>
            <form onSubmit={handleSubmitPneu}>
                    <Form style={{marginBottom:'5%'}}>
                        <Form.File 
                        id="custom-file"
                        label={message1}
                        custom
                        onChange={uploadPneu}
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
          <hr/>
          <h5>Modifier l'image explicative 1</h5>
          <Styles >
            <div classname= 'container-left'>
            {Image_1_updated ? <img src={`${process.env.REACT_APP_API_URL}/${images.image_1}`} className='image'/> :<img src={`${process.env.REACT_APP_API_URL}/${props.images.image_1}`} className='image'/>}            </div>
            <div classname= 'container-right'>
            <form onSubmit={handleSubmit1}>
                    <Form style={{marginBottom:'5%'}}>
                        <Form.File 
                        id="custom-file"
                        label={message2}
                        custom
                        onChange={upload1}
                        />
                        <div className='progress mb-3 w-100'>
                            <div
                            className='progress-bar'
                            role='progressbar'
                            style={{ width: `${ progressPercent2}%`, height:'20px'}}
                            aria-valuenow={ progressPercent2}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            >
                            { progressPercent2}
                        </div>
                        </div>
                    </Form>
                    <Button type='submit' variant="contained" style={{background:'#5C73F2', color:'white'}}>
                    Envoyer
                    </Button>
                </form>
            </div>
          </Styles>
          <hr/>
          <h5>Modifier l'image explicative 2</h5>
          <Styles>
            <div classname= 'container-left'>
            {Image_2_updated ? <img src={`${process.env.REACT_APP_API_URL}/${images.image_2}`} className='image'/> :<img src={`${process.env.REACT_APP_API_URL}/${props.images.image_2}`} className='image'/>}            
            </div>
            <div classname= 'container-right'>
                <form onSubmit={handleSubmit2}>
                    <Form style={{marginBottom:'5%'}}>
                        <Form.File 
                        id="custom-file"
                        label={message3}
                        custom
                        onChange={upload2}
                        />
                        <div className='progress mb-3 w-100'>
                            <div
                            className='progress-bar'
                            role='progressbar'
                            style={{ width: `${ progressPercent3}%`, height:'20px'}}
                            aria-valuenow={ progressPercent3}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            >
                            { progressPercent3}
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
  