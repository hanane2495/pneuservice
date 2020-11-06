import React from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import {Form, InputGroup, FormControl} from 'react-bootstrap'

//component 
import TableMapping from '../Components/TableMapping'

//icon
import {FiSearch} from 'react-icons/fi'


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

const InfoPneu = styled.form`

    .input-group {
      width:100%;
      height:9vh;
      margin-bottom:10px;
    }
    .form-control{
      height:100%;
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
    'Choisir un fichier stock (CSV *) ',
    'Mapper les produit non mappées'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
      <FormStyle>
         <h5>Inserer votre fichier stock (csv *)</h5>
         <Form style={{marginBottom:'5%'}}>
          <Form.File 
            id="custom-file"
            label="cliquer pour inserer"
            custom
          />
         </Form>
      </FormStyle>
      )
    case 1:
      return (
          <InfoPneu>
             <InputGroup >
                        <FormControl
                          placeholder="Search for articles..."
                          aria-label="search"
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                           <Button variant="outline-secondary">
                               <Link >
                                    <FiSearch/>
                               </Link>
                            </Button>
                        </InputGroup.Append>
             </InputGroup>
            <TableMapping/>
          </InfoPneu>
      );
    default:
      return 'etape non reconnue';
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
            <Typography className={classes.instructions}>Stock ajouté avec succes</Typography>
            <Button onClick={handleReset}>Réinitialiser</Button>
          </div>
        ) : (
            <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
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

