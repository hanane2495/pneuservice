import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'

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
 import LocalOfferIcon from '@material-ui/icons/LocalOffer';

 import styled from 'styled-components';



 const Styles = styled.div`
 .MuiTableCell-root {
    padding: 3px !important;
    overflow:hidden; 
    white-space:nowrap; 
    text-overflow: ellipsis;
  }
 `

const TablePneu = () => {
  const [pneus, setPneus] = useState([])
  const [state, setState] = React.useState({});
    
    function handleDeletePneu(listPneu){
        console.log(listPneu)
      axios.post(`${process.env.REACT_APP_API_URL}/delete/pneus`, {listPneu})
      .then(res => {
        console.log(res.data.message)
      })
    }

    function handleUpdatePneu(categorie, type, marque, collection, largeur, hauteur, diametre, charge, vitesse, designation_pneu, carburant, adherence, bruit, marge, promo, pneu_id){
      axios.post(`${process.env.REACT_APP_API_URL}/update/pneus`, {categorie, type, marque, collection, largeur, hauteur, diametre, charge, vitesse, designation_pneu, carburant, adherence, bruit, marge, promo, pneu_id})
      .then(res => {
        console.log(res.data.message)
      })
    }
    function handleAddPneu(categorie, type, marque, collection, largeur, hauteur, diametre, charge, vitesse, designation_pneu, carburant, adherence, bruit, marge, promo){
      axios.post(`${process.env.REACT_APP_API_URL}/add/pneus`, {categorie, type, marque, collection, largeur, hauteur, diametre, charge, vitesse, designation_pneu, carburant, adherence, bruit, marge, promo})
      .then(res => {
        console.log(res.data.message)
      })
    }
    
    useEffect(() => {
      let pneu = []
      axios.post(`${process.env.REACT_APP_API_URL}/get/pneus`)
      .then(res => { 
        pneu = res.data
        setPneus(pneu)
      })
      .catch(err => {
        console.log(err)
      })
    }, []) 
    
    useEffect(() => {
        setState({
          columns: [
            { title: 'Designation', field: 'designation_pneu'},
            { title: 'Categorie', field: 'categorie'},
            { title: 'Collection', field: 'collection'},
            { title: 'Marque', field: 'marque'},
            { title: 'Type', field: 'type'},
            { title: 'Largeur', field: 'largeur'},
            { title: 'Hauteur', field: 'hauteur' },
            { title: 'Diametre', field: 'diametre'},
            { title: 'Charge', field: 'charge'},
            { title: 'Vitesse', field: 'vitesse'},
            { title: 'carburant', field: 'carburant'},
            { title: 'adherence', field: 'adherence'},
            { title: 'bruit', field: 'bruit'},
            { title: 'marge', field: 'marge'},
            { title: 'promo', field: 'promo'}
          ],
          data:pneus,
        }) 
      
    }, [pneus]) 
      return (
        <Styles>
        <MaterialTable
          style={{width:'100%', height:'100%'}}
          title=""
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
                icon: ()=><LocalOfferIcon/>,
                tooltip: 'Ajouter promo',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
            }

          ]}
          options={{
            selection: true,
            rowStyle: {
              height: '10px',
            }
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  handleAddPneu(newData.categorie, newData.type, newData.marque, newData.collection, newData.largeur, newData.hauteur, newData.diametre, newData.charge, newData.vitesse, newData.designation_pneu, newData.carburant, newData.adherence, newData.bruit, newData.marge, newData.promo)
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
                    handleUpdatePneu(newData.categorie, newData.type, newData.marque, newData.collection, newData.largeur, newData.hauteur, newData.diametre, newData.charge, newData.vitesse, newData.designation_pneu, newData.carburant, newData.adherence, newData.bruit, newData.marge, newData.promo, oldData.pneu_id)
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
                  let listPneu = [oldData.id_pneu_ag]
                  handleDeletePneu(listPneu)
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
      </Styles>
    );
}      
export default TablePneu;