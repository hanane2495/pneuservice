import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {Form } from 'react-bootstrap';
import axios from 'axios';
import Switch from 'react-switch'
import Autosuggest from 'react-autosuggest'


import MaterialTable from 'material-table';

import Search from "@material-ui/icons/Search"
 import ViewColumn from "@material-ui/icons/ViewColumn"
 import SaveAlt from "@material-ui/icons/SaveAlt"
 import ChevronLeft from "@material-ui/icons/ChevronLeft"
 import ChevronRight from "@material-ui/icons/ChevronRight"
 import FirstPage from "@material-ui/icons/FirstPage"
 import LastPage from "@material-ui/icons/LastPage"
 import Check from "@material-ui/icons/Check"
 import FilterList from "@material-ui/icons/FilterList"
 import DeleteIcon from '@material-ui/icons/Delete';
 import AddBoxIcon from '@material-ui/icons/AddBox';
 import EditIcon from '@material-ui/icons/Edit';
 import ClearIcon from '@material-ui/icons/Clear';
 import SaveIcon from '@material-ui/icons/Save';


//components
import TableCommande from '../Components/TableCommande';


const Styles = styled.div`
 height:100%;
 padding:0.5% 1.5%;
  .switch{
    display:flex;
    flex-direction:row;
  }
  .table-commandes{
    padding: 1%;
    height:520px;
    background:white;
    overflow-y:auto;
    border-radius:15px;
    box-shadow:5px 10px 20px 1px rgba(0, 0, 0, 0.153);

    &::-webkit-scrollbar{
        width: 5px;
        height: 1%;
        background: #fff;
        border-radius:15px;
        margin-left: 2px;
    }

    &::-webkit-scrollbar-thumb{
        border-radius: 15px;
        background-color: #aaa;
    }

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



const Commande = () => {
    const [mapping, setMapping] = useState([])
    const [nonMappee, setNonMappee] = useState([])

    const [state, setState] = React.useState({});
    const [checked, setChecked] = useState(false);
    const [valeur, setValeur] = useState('non-mappés')

    const [categorie, setCategorie] = useState('auto')

    const [country, setCountry] = React.useState("");
    const [suggestions, setSuggestions] = React.useState([]);
    const [searchRes, setSearchRes] = useState({
      id : null,
      designation : ""
    })

    const handleRadioChange = (event) => {
      setCategorie(event.target.value)
    }
      
      function handleDeleteMapping(listMapping){
        axios.post(`${process.env.REACT_APP_API_URL}/delete/mapping`, {listMapping})
        .then(res => {
          console.log(res.data.message)
        })
      }
  
      function handleUpdateMapping(id_pneu_service, id_pneu_fournisseur, designation, id_fournisseur, id_mapping){
        axios.post(`${process.env.REACT_APP_API_URL}/update/mapping`, {id_pneu_service, id_pneu_fournisseur, designation, id_fournisseur, id_mapping})
        .then(res => {
          console.log(res.data.message)
        })
      }
      
      function handleAddMapping(suppliers_code, id_pneu_service, designation, id_fournisseur){
        console.log('add mapping')
        axios.post(`${process.env.REACT_APP_API_URL}/add/mapping`, {suppliers_code, id_pneu_service, designation, id_fournisseur})
        .then(res => {
          console.log(res.data.message)
        })
      }
      
      useEffect(() => {
        let map = []
        let nmap = []
       
          axios.post(`${process.env.REACT_APP_API_URL}/get/produit/non/mapee`)
          .then(res => { 
            nmap = res.data.produits_non_mappee
            setNonMappee(nmap)
            console.log(res.data.produits_non_mappee)
          })
          .catch(err => {
            console.log(err)
          })    
       
          axios.post(`${process.env.REACT_APP_API_URL}/get/all/mapping`)
          .then(res => { 
            map = res.data
            setMapping(map)
            console.log(res.data)

          })
          .catch(err => {
            console.log(err)
          })
      
      }, []) 

      const handleChange = () => {
        setChecked(!checked);
        if(valeur == 'non-mappés'){
          setValeur('mappés')
        }else{
          setValeur('non-mappés')
        }
      }

      useEffect(() => {

        if(valeur == 'non-mappés'){
          setState({
            columns: [
              { title: 'ID pneu fournisseur', field: 'suppliers_code'},  
              { title: 'ID fournisseur', field: 'id_fournisseur'},
              { title: 'Designation Fournisseur', field: 'designation_f'},
              { title: 'ID pneu service', field: 'id_pneu_service'},
              { title: 'Designation pneu service', field: 'designation'},
      
            ],
            data:nonMappee,
          })
        }else{
          setState({
            columns: [
              { title: 'Suppliers code', field: 'id_pneu_fournisseur' },
              { title: 'ID pneuservice', field: 'id_pneu_service' },
              { title: 'designation', field: 'designation' },
              { title: 'fournisseur', field: 'nom' }
            ],
            data:mapping,
          })
        } 
    }, [mapping, nonMappee, valeur]) 

  

    return(
        <React.Fragment>
            <Styles>
                <div className='table-commandes'>
                <label>
                  <div className='switch'>
                    <Switch onChange={handleChange} checked={checked} />
                    <h5 style={{marginLeft : '25px'}}>produits {valeur}</h5>
                  </div> 
                </label>
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
            </InfoPneu>
                <MaterialTable
                    style={{width:'100%', height:'100%'}}
                    title=" "
                    icons={{
                        Check: () => <Check />,
                        Export: () => <SaveAlt />,
                        Filter: () => <FilterList />,
                        FirstPage: () => <FirstPage />,
                        LastPage: () => <LastPage />,
                        NextPage: () => <ChevronRight />,
                        PreviousPage: () => <ChevronLeft />,
                        Search: () => <Search />,
                        ThirdStateCheck: () => <DeleteIcon />,
                        ViewColumn: () => <ViewColumn />,
                        DetailPanel: () => <ChevronRight />,
                        Add: () => <AddBoxIcon/>,
                        Delete: () => < DeleteIcon/>,
                        Edit: ()=><EditIcon/>,
                        Clear : () => <ClearIcon/>,
                        Save : () => <SaveIcon/>
                    }}
                    columns={state.columns}
                    data={state.data}
                    actions={[
                        {
                            icon: () => <DeleteIcon />,
                            tooltip: 'Telecharger',
                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                        },
                        {
                            icon: ()=><EditIcon/>,
                            tooltip: 'Telecharger',
                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                        }

                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        selection: true
                    }}
                    editable={{
                        onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                            }, 600);
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            if (oldData) {
                              if(valeur === 'non-mappés'){
                                handleAddMapping(newData.suppliers_code, newData.id_pneu_service, newData.designation, newData.id_fournisseur)
                                console.log(newData)
                                setState((prevState) => {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return { ...prevState, data };
                                });
                              }else{
                                handleUpdateMapping(newData.id_pneu_service, newData.id_pneu_fournisseur, newData.designation, newData.id_fournisseur, oldData.id_mapping)
                                console.log(newData)
                                setState((prevState) => {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return { ...prevState, data };
                                });
                              }
                                
                            }
                            }, 600);
                        }),
                        onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            let listMapping = [oldData.id_mapping]
                            handleDeleteMapping(listMapping)
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                            }, 600);
                        }),
                    }}
                    />
                </div>        
            </Styles>
        </React.Fragment>
        
        
    )
}

export default Commande;