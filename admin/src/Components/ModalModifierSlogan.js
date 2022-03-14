import React,{ useState, useEffect} from "react";
import {Modal, Button, Form} from 'react-bootstrap'
import styled from 'styled-components';
import axios from 'axios'
import Switch from 'react-switch'
import Autosuggest from 'react-autosuggest'


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



export default function MyVerticallyCenteredModalImage(props) {

    const [categorie, setCategorie] = useState('auto')

    const [country, setCountry] = React.useState("");
    const [suggestions, setSuggestions] = React.useState([]);
    const [searchRes, setSearchRes] = useState({
      id : null,
      designation : ""
    })

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
               Recommander un autre pneu          
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InfoPneu>
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
            </InfoPneu>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  