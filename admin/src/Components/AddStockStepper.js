import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import {Form, InputGroup, FormControl} from 'react-bootstrap'
import axios from 'axios'
import Autosuggest from 'react-autosuggest'


//component 
import TableMapping from '../Components/TableMapping'
import TableStock from '../Components/TableFichierstock'

//icon
import {FiSearch} from 'react-icons/fi'


const FormStyle = styled.form`
    display:flex;
    flex-direction:column;
    width:100%;
    height:auto;
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

    .radioList{
      display:flex;
      flex-direction : row;
      align-items:center;
    }

    .radioInput{
      margin: 0 10px;
    }
    .searchInput{
      width : 90%;
    }

    .react-autosuggest__input{
      width: 100% !important;
      padding: 10px !important;
    }

    li{
      list-style:none !important;
    }

    .resultat{
      color : green;
      display:flex;
      flex-direction:row;
      margin : 20px;
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



export default function HorizontalLabelPositionBelowStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  //upload stock
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState({
    found: false,
    message: '',
  });
  const [message, setMessage] = useState('cliquer pour inserer')
  const [formDataStock, setFormDataStock] = useState(null)

  const [categorie, setCategorie] = useState('auto')

  //produit non_mappee
  const [produits_non_mappee, setProduits_non_mappee] = useState([])
  const [stock, setStock] = useState([])


  const [country, setCountry] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [searchRes, setSearchRes] = useState({
    id : null,
    designation : ""
  })

//_______________________________________File upload_______________________________________________  
  // handle file input change and store data in formDataStock
  const upload = (e) => {
    const data = new FormData()
    data.append('id_fournisseur', props.id_fournisseur)
    data.append('categoryImage', e.target.files[0])
    data.append('name', e.target.files[0].name)
    setFormDataStock(data)
    setMessage(e.target.files[0].name)
  };

  /*function handleSearch(){
    axios.post(`${process.env.REACT_APP_API_URL}/get/centre/montage`, {ville})
    .then(res => {
        console.log(ville)
        console.log(res.data)
        setCentreMontage(res.data)
        executeScroll()
    })
    .catch(err => {
        console.log(err)
    })
  }*/

  ///get/designations

 const handleRadioChange = (event) => {
   setCategorie(event.target.value)
 }

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
      axios.post(`${process.env.REACT_APP_API_URL}/add/stock`, formDataStock, options)
      .then((res) => {
        //get data from server 
        setTimeout(() => {
          setProduits_non_mappee(res.data.produits_non_mappee)
          setStock(res.data.stock)
          console.log(res.data.stock)
          setProgressPercent(0);
          setMessage('Envoyé')
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
          setMessage(err.rresponse)
          setProgressPercent(0);
        }, 3000);
      });
      };
//_____________________________________fin file upload_________________________________________

//stepper functions
  function getSteps() {
    return [
      'Choisir un fichier stock (CSV *) '
    ];
  }
  
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
        <FormStyle>
          <form onSubmit={handleSubmit}>
           <h5>Inserer votre fichier stock (csv *)</h5>
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
            <Button style={{marginLeft: "86%"}} type='submit' variant="contained" color="primary">
              Envoyer
            </Button>
            {message== "Envoyé" ? 
              <TableStock stock={stock} />
            : null
            }
            </form>
        </FormStyle>
        )
      
      default:
        return 'etape non reconnue';
    }
  }

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

/**
 *            <InputGroup >
                <Autocomplete
                    id="free-solo-demo"
                    onChange = {onDesignationChange}
                    options={designations.map((option) => option.designation)}
                    renderInput={(params) => (
                    <TextField {...params} placeholder="Designation (ex : ...)" margin="none" variant="outlined" style={{padding:'0'}}/>
                    )}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" >
                        <FiSearch/>
                    </Button>
                </InputGroup.Append>
              </InputGroup>


               <div ref={wrapperRef}>
                <InputGroup>
                  <input 
                      className = 'searchInput' 
                      type= 'text'
                      id="auto"
                      onClick={() => setDisplay(!display)}
                      placeholder="Type to search"
                      value={search}
                      onChange={event => setSearch(event.target.value)}
                  />
                  <InputGroup.Append>
                      <Button style={{background:"#777"}} variant="outline-secondary" >
                          <FiSearch/>
                      </Button>
                  </InputGroup.Append>
                </InputGroup>
                </div>



                useEffect(() => {
  let stoc = []
  axios.post(`${process.env.REACT_APP_API_URL}/get/designations`, {categorie})
  .then(res => { 
    stoc = res.data
    setDesignations(stoc)
    
  })
  .catch(err => {
    console.log(err)
  })
}, [categorie])


              select designation_pneu, pneu_id from pneu_dimension where designation_pneu ilike '%bridgestone%'
 */



 /**
  * 
  * case 1:
        return (
            <InfoPneu>
                <h3>Choisir une categorie (par defaut : Pneu Auto)</h3>
                <div className='radioList'>
                   <input className='radioInput' type='radio' value='auto' checked={categorie == 'auto'} onChange={handleRadioChange}/> 
                   <p style={{paddingTop: '10px', marginRight:'30px'}}>Pneu Auto</p>
                   <input className='radioInput' type='radio' value='moto' checked={categorie == 'moto'} onChange={handleRadioChange}/>
                   <p style={{paddingTop: '10px', marginRight:'30px'}}>Pneu Moto</p> 
                   <input className='radioInput' type='radio' value='poids-lourd' checked={categorie == 'poids-lourd'} onChange={handleRadioChange}/>
                   <p style={{paddingTop: '10px', marginRight:'30px'}}>Pneu Poids Lourd</p> 
                   <input className='radioInput' type='radio' value='agricole' checked={categorie == 'agricole'} onChange={handleRadioChange}/>
                   <p style={{paddingTop: '10px', marginRight:'30px'}}>Pneu Agricole</p> 
                </div>
                <Autosuggest
                   suggestions={suggestions}
                   onSuggestionsFetchRequested = { async ({ value }) => {
                      if (!value) {
                        setSuggestions([]);
                        return;
                      }

                      try {
                        const response = await axios.post(
                          `${process.env.REACT_APP_API_URL}/get/designations`, {categorie, value}
                        );
      
                        setSuggestions(
                          response.data.map(row => ({
                            id: row.id,
                            designation: row.designation
                          }))
                        );
                      } catch (e) {
                        setSuggestions([]);
                      }
                   }}
                   onSuggestionsClearRequested={() => {
                    setSuggestions([]);
                  }}
                  getSuggestionValue={suggestion => suggestion.designation}
                  renderSuggestion={suggestion => (
                    <div>
                      {suggestion.designation}
                    </div>
                  )}
                  onSuggestionSelected={(event, { suggestion, method }) => {
                    if (method === "enter") {
                      event.preventDefault();
                    }
                    setSearchRes({
                      id : suggestion.id,
                      designation : suggestion.designation
                    })
                    setCountry(suggestion.designation);
                  }}
                  inputProps={{
                    placeholder: "Search for your designation",
                    autoComplete: "abcd",
                    value: country,
                    name: "country",
                    onChange: (_event, { newValue }) => {
                      setCountry(newValue);
                    }
                  }}
                  style={{width : '90%'}}
                />
                {searchRes.designation === "" ? null : 
                  <div style={{marginTop:'20px'}}>
                    <h10 style={{color:'#555'}}>Resultat</h10>
                    <hr/>
                    <div className='resultat'>
                      <h8 style={{marginRight:'20px'}}>ID : {searchRes.id}</h8>
                      <h8>Designation : {searchRes.designation}</h8>
                    </div>
                   </div>   
                }
              <hr/>
              <TableMapping  produits_non_mappee = {produits_non_mappee}/>
            </InfoPneu>
        );
  */