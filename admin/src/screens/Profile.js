import React, {useState, useEffect} from "react";
import Link from 'react-router-dom';
import { Card, Form} from "react-bootstrap";
import {ToastContainer, toast} from 'react-toastify'
import styled from 'styled-components';
import axios from 'axios'



//icons
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import LocalSeeIcon from '@material-ui/icons/LocalSee';

//images 
import profile from '../assets/profile1.jpg';

//components
import BadgeAvatars from '../Components/ModifieAvatar'
import { isAuth, updateUser, updateImage } from "../helpers/auth";
    


const Styles = styled.div`
 height:100%;
  .profile-layout{
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
  .titre-profile{
    grid-area: title-com;
    justify-content:center;
    justify-items:center;
    align-items:center;
    padding:0 1.5%;
    padding-left:0;
  }
  .profile{
    grid-area: table-com;
    justify-content:center;
    justify-items:center;
    align-items:center;
    padding: 1.5%;
    padding-left:0;

  }
  .card-profile1{
      display:flex;
      flex-direction: row;
      justify-content:left;
      height: 100%;
      width:100%;
      padding-left: 2%;
      padding-top:0.5%;
      border-radius:10px;
      box-shadow:5px 10px 20px 1px rgba(0, 0, 0, 0.153);
  }
  .card-profile{
    display: grid;
    height:100%;
    width:100%;
    grid-template-areas:
        'avatar   info     colonne2'
        'colonne1 colonne1 colonne2'
        'ligne ligne ligne';
     grid-template-rows: 40% 45% 15%;
     grid-template-columns: 25% 25% 50%;
     padding:1% 1% 1% 2% ;
     transition:0.9s;
     justify-content:center;
     border-radius:10px;
     box-shadow:5px 10px 20px 1px rgba(0, 0, 0, 0.153);
  }
  .avatar{
    grid-area:avatar;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-items:center;
  }
  .info{
    grid-area:info;
    display:flex;
    flex-direction:column;
    align-items:left;
    justify-items:center;
    padding-top:3%;
  }
  .colonne1{
      grid-area:colonne1;
      display:flex;
      flex-direction:column;
      justify-items:center;
      align-items:left;
      padding:2%;
      margin-top:8.7%;
  }
  .colonne2{
      grid-area:colonne2;
      display:flex;
      flex-direction:column;
      justify-items:center;
      align-items:left;
      padding:2%;
  }
  .ligne{
      grid-area:ligne;
      display:flex;
      flex-direction:row;
      justify-content:flex-end;
      align-items:center;
  }
  .nom-prenom{
    display:flex;
    flex-direction:row;
    margin:1.5% 0;
  }
  .form-profile{
      margin: 1% 2% 2% 0;

  }
`;


const Profile = () => {
    const [formDataProfile, setFormDataProfile] = useState({
        nom : isAuth().nom,
        prenom : isAuth().prenom,
        email : isAuth().email,
        password : '',
        telephone1 : isAuth().telephone1,
        telephone2 : isAuth().telephone2,
        adresse : isAuth().adresse,
        fonction : isAuth().fonction,
        id : isAuth().id,
        categoryImage : null,
        name : '',
    })
    const [confPassword, setConfPassword] = useState('')
    const [image, setImage] = useState(JSON.parse(localStorage.getItem('image')))
    const [formDataImage, setFormDataImage] = useState(null)
    const [progressPercent, setProgressPercent] = useState(0);
    const [error, setError] = useState({
        found: false,
        message: '',
      });
    const [info, setInfo] = useState({
        image: isAuth().image_url,
        name: isAuth().name,
    });
    
    
    // handle image change and store data in formDataImage
    const upload = (e) => {
        const data = new FormData()
        data.append('name', e.target.files[0].name)
        data.append('categoryImage', e.target.files[0])
        
        const {nom, prenom, adresse, fonction, telephone1, telephone2, email, password, id} = formDataProfile
        data.append('nom', nom)
        data.append('prenom', prenom)
        data.append('adresse', adresse)
        data.append('fonction', fonction)
        data.append('telephone1', telephone1)
        data.append('telephone2', telephone2)
        data.append('email', email)
        data.append('password', password)
        data.append('id', id)
        setFormDataImage(data)
    };

    //handle chages user data info
    const handleChange = text => e => {
        setFormDataProfile({ ...formDataProfile, [text]: e.target.value });
        if(text == 'confPassword'){
          setConfPassword(e.target.value)
        }
    };

    // Submit Form
    const handleSubmit = (e) => {
        e.preventDefault();
      setProgressPercent(0);
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          setProgressPercent(percent);
        },
      };

    //send data to server   
    axios
      .post(
      `${process.env.REACT_APP_API_URL}/update/user`, //url
      formDataImage === null ? formDataProfile : formDataImage, //data
      options)
      .then((res) => {
        setConfPassword('')
        setFormDataProfile({...formDataProfile,
          password:''
        })
        if(res.data.image){
          setImage(res.data.image)
          updateImage(res, ()=>{
          })
        }
        updateUser(res, ()=>{
          toast.success(`${res.data.message}`);
        })
        //get data from server 
        setTimeout(() => {
          setInfo(res.data.image);
          setProgressPercent(0);
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
          setProgressPercent(0);
        }, 3000);
      });
    };


    return(
        <React.Fragment>
            <Styles>
            <ToastContainer style={{fontSize:'0.8em'}} />
            <div className='profile-layout'>
                <div className='titre-profile'>
                    <Card className='card-profile1'>
                        <p style={{fontSize:'1.2rem', fontWeight:'500', color:'#999', marginTop:'0.5%'}}>Mon Profile</p>
                    </Card>
                </div>
                <div className='profile'>
                <form onSubmit={handleSubmit}>

                    <Card className='card-profile'>

                           <div className='avatar'>
                                <BadgeAvatars upload = {upload} image={image} />
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
                            </div>
                            <div className='info'>
                                <h4 style={{color:'#777'}}>Mon Profile</h4>
                                <h6>{formDataProfile.nom+" "+formDataProfile.prenom}</h6>
                                <h6>{formDataProfile.fonction}</h6>
                                <h6>{formDataProfile.email}</h6>
                                <h6>{formDataProfile.telephone1}</h6>
                            </div>
                                <div className='colonne1'>
                                    <h6 style={{color:'#777'}}>Identifiant de connexion</h6>
                                    <Form.Control className='form-profile' type="text" name='mot_de_passe' placeholder="Nouveau Mot de passe" onChange={handleChange('password')} value={formDataProfile.password}/>
                                    <Form.Control className='form-profile' type="text" name="mot_de_passe2" placeholder="Confirmer Nouveau Mot de passe" onChange={handleChange('confPassword')} value={confPassword}/>
                                </div>
                                <div className='colonne2'>
                                    <h6 style={{color:'#777'}}>Coordonnées</h6>
                                    <div className='nom-prenom'>
                                        <Form.Control style={{marginRight:'0.4rem'}} type="text" name="nom" placeholder={formDataProfile.nom+" *"} onChange={handleChange('nom')} value={formDataProfile.nom}/>
                                        <Form.Control className='form-nom-prenom' type="text" name="prenom" placeholder={formDataProfile.prenom+" *"} onChange={handleChange('prenom')} value={formDataProfile.prenom} />
                                    </div>
                                    <Form.Control className='form-profile' type="text" name="fonction" placeholder={formDataProfile.fonction+" *"} onChange={handleChange('fonction')} value={formDataProfile.fonction}  />
                                    <Form.Control className='form-profile' type="email" name="email" placeholder={formDataProfile.email+" *"} onChange={handleChange('email')} value={formDataProfile.email}  />
                                    <Form.Control className='form-profile' type="text" name="adresse" placeholder={formDataProfile.adresse} onChange={handleChange('adresse')} value={formDataProfile.adresse} />
                                    <Form.Control className='form-profile' type="text" name="telephone1" placeholder={formDataProfile.telephone1+" *"} onChange={handleChange('telephone1')} value={formDataProfile.telephone1}  />
                                    <Form.Control className='form-profile' type="text"  name="telephone2" placeholder={formDataProfile.telephone2+" *"} onChange={handleChange('telephone2')} value={formDataProfile.telephone2} />
                                </div>
                            <div className='ligne'>
                                <button type='submit' style={{color:'#fff', background:'#0B9ED9', border:'none', width:'7rem', height:'2.5rem', margin:'0.8rem 0.5rem 0 0.5rem', borderRadius:'0.5rem'}}>Sauvegarder</button>
                                <button type='submit' style={{color:'#fff', background:'#aaa', border:'none', width:'5rem', height:'2.5rem', margin:'0.8rem 0.5rem 0 0.5rem', borderRadius:'0.5rem'}}>Annuler</button>
                            </div>                       
                    </Card>
                    </form>

                </div>        
            </div>
            </Styles>
        </React.Fragment>
        
        
    )
}

export default Profile;