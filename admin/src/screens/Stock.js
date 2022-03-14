import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {Form } from 'react-bootstrap';
import axios from 'axios';



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


const Commande = () => {
  const [stock, setStock] = useState([])
    const [state, setState] = React.useState({});
      
      function handleDeleteStock(liststock){
        axios.post(`${process.env.REACT_APP_API_URL}/delete/stock`, {liststock})
        .then(res => {
          console.log(res.data.message)
        })
      }
  
      function handleUpdateStock(suppliers_code, qte, price, id_stock){
        axios.post(`${process.env.REACT_APP_API_URL}/update/stock`, {suppliers_code, qte, price, id_stock})
        .then(res => {
          console.log(res.data.message)
        })
      }
      /*function handleAddstock(id_pneu_service, id_pneu_fournisseur, designation, id_fournisseur){
        axios.post(`${process.env.REACT_APP_API_URL}/add/Fournisseur`, {id_pneu_service, id_pneu_fournisseur, designation, id_fournisseur})
        .then(res => {
          console.log(res.data.message)
        })
      }*/
      
      useEffect(() => {
        let stoc = []
        axios.post(`${process.env.REACT_APP_API_URL}/get/stock`)
        .then(res => { 
          stoc = res.data
          setStock(stoc)
        })
        .catch(err => {
          console.log(err)
        })
      }, []) 

      useEffect(() => {
        setState({
          columns: [
            { title: 'ID supplier', field: 'suppliers_code' },
            { title: 'designation', field: 'designation_f' },
            { title: 'Prix', field: 'price', type : 'numeric'},
            { title: 'Qt', field: 'qte', type : 'numeric'},
            { title: 'Date ajout', field: 'date_ajout' },
            { title: 'Fournisseur', field: 'nom' }
          ],
          data:stock,
        }) 
      
    }, [stock]) 

    return(
        <React.Fragment>
            <Styles>
                  <div className='table-commandes'>
                  <MaterialTable
                  style={{width:'100%', height:'100%'}}
                  title="Stock"
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
                    
                  ]}
                  options={{
                    actionsColumnIndex: -1,
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
                            handleUpdateStock(newData.suppliers_code, newData.qte, newData.price, oldData.id_stock)
                            setState((prevState) => {
                              const data = [...prevState.data];
                              data[data.indexOf(oldData)] = newData;
                              return { ...prevState, data };
                            });
                          }
                        }, 600);
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          let listStock = [oldData.id_stock]
                          handleDeleteStock(listStock)
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