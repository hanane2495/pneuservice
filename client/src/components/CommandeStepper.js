import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import {Form} from 'react-bootstrap'

//images
import default_img from '../assets/default_image.png'


const FormStyle = styled.form`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

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

const InfoPneu = styled.form`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;

    .image-container{
    display:flex;
    flex-direction:column;
    width:30%;
    height:100%;
    border:1px solid #777
}
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    'Saisir vos informations personneelles',
   'valider la commande'];
}

function getStepContent(stepIndex, pneu, wilayas, commande, total) {
  switch (stepIndex) {
    case 0:
      return (
      <FormStyle>
          <div className='form-row-1'>
            <input className='form-input-1' type="text"  name="lastname" placeholder="Votre Nom*.."/>
            <input className='form-input-1' type="text"  name="firstname" placeholder="Votre Prenom.."/>
          </div>
          <input className='form-input-2' type="email"  name="email" placeholder="Votre Email*.."/>
          <input className='form-input-2' type="tel"  name="telephone" placeholder="Votre Telephone*.."/>
      </FormStyle>
      )
    case 1:
      return (
          <InfoPneu>
            <div className='image-pneu-section'>
            { 
              pneu.image_url === null ? 
                <div className='default-img'>
                    <img
                        src={`${default_img }`}
                        className='image-pneu'
                    />
                    <div className="overlay">
                        <div className="text">Image Non Disponible</div>
                    </div>
                </div>
              :
                <img
                    src={`https://www.monsterstudio.org${pneu.image_url}`}
                    className='image-pneu'
                />
            }{
              pneu.marque_img === null ? null :
              <div className='image-marque-container'>
                  <img
                      src={`https://www.monsterstudio.org${pneu.marque_img}`}
                      className='image-marque'
                  />
              </div>
            }
            </div>
            <div className='info-pneu-section'>
              <p className='pneu'>Pneu {pneu.marque}{pneu.collection} </p>
              <p className='dimension'>{pneu.largeur}/ {pneu.hauteur} R{pneu.diametre}  {pneu.charge} {pneu.vitesse}</p>
              <div className='caracteristique'>
                  <p className='titre'>Gamme :</p>
                  <p className='paragraphe'>competition</p>
              </div>
              <div className='caracteristique'>
                  <p className='titre'>Usage :</p>
                  <p className='paragraphe'>trackday (semi-slick)</p>
              </div>
            </div>
            <div className='info-commande-section'>
            <div className='quantite'>
              <p style={{margin:'2%', color:'red'}}>quantite</p>
              <Form>
                  <Form.Group controlId="exampleForm.SelectCustom">
                      <Form.Control 
                      as="select" 
                          custom
                          value={commande.quantite}
                          onChange={handleChangeCommande('quantite')}
                      >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      </Form.Control>
                  </Form.Group>
              </Form>
            </div>
            <div className='quantite'>
                <p style={{margin:'2%', color:'red'}}>Wilaya</p>
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control 
                        as="select" 
                        custom
                        value={commande.wilaya}
                        onChange={handleChangeCommande('wilaya')}
                        >
                        <option>-- --</option>
                        {wilayas.map( (wilaya) => 
                            <option>{wilaya.wilaya}, ({parseInt(wilaya.frais) === 0 ? 'GRATUIT' : wilaya.frais+"DA"})</option>
                        )}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </div>
            {commande.wilaya === 'Oran, (GRATUIT)' ? 
              <div className='centre-mentage'>
                  <p style={{margin:'2%', color:'red'}}>Un centre de montage ?</p>
                  <Form>
                      <Form.Group controlId="exampleForm.SelectCustom">
                          <Form.Control 
                          as="select" 
                          custom
                          value={commande.centre_montage}
                          onChange={handleChangeCommande('centre_montage')}
                          >
                          <option>-- --</option>
                          <option>SARL Senia Pneu</option>
                          <option>
                              EURL BFM Pneu
                          </option>
                          </Form.Control>
                      </Form.Group>
                  </Form>
                  <Link to='#' style={{margin:'0.5% 2%', color:'#555', textDecoration:'none'}}>Visiter le centre de mentage !</Link>
              </div>
            : null 
            }
            {commande.wilaya === '' ? null : 
              <div>
                  <p style={{margin:'50% 0 0.5% 2%', color:'red', textDecoration:'none'}}>Total : </p>
                  <p style={{margin:'0.5% 2%', color:'#555', fontSize:'1.5em', width:'100%'}}>{total} DA</p>
              </div>
            }
            </div>
          </InfoPneu>
      );
    default:
      return 'Unknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
            <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep, props.pneu, props.wilayas, props.commande, props.total)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

