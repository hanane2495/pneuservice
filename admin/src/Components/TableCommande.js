import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

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

const TableCommande = () => {
    const [commandes, setCommandes] = useState([])
    const [state, setState] = React.useState({});
      
      function handleDeleteCommande (id_commande, code_commande){
        axios.post(`${process.env.REACT_APP_API_URL}/delete/commande`, {id_commande, code_commande})
        .then(res => {
          console.log(res.data.message)
        })
      }

      function handleUpdateCommande(nom_client, prenom_client, email, telephone, designation_pneu, prix_uht, quantite, wilaya, frais_livraison, centre_mentage, total, date_commande, id_commande, code_commande){
        axios.post(`${process.env.REACT_APP_API_URL}/update/commande`, {nom_client, prenom_client, email, telephone, designation_pneu, prix_uht, quantite, wilaya, frais_livraison, centre_mentage, total, date_commande, id_commande, code_commande})
        .then(res => {
          console.log(res.data.message)
        })
      }
      
      useEffect(() => {
        let comm = []
        axios.post(`${process.env.REACT_APP_API_URL}/get/commande`)
        .then(res => { 
          comm = res.data
          setCommandes(comm)
        })
        .catch(err => {
          console.log(err)
        })
      }, []) 
      
      useEffect(() => {
          setState({
            columns: [
              { title: 'Code', field: 'code_commande'},
              { title: 'Date', field: 'date_commande'},
              { title: 'Nom client', field: 'nom_client'},
              { title: 'Prenom client', field: 'prenom_client'},
              { title: 'Email', field: 'email'},
              { title: 'Telephone', field: 'telephone'},
              { title: 'Pneu', field: 'designation_pneu'},
              { title: 'Qt', field: 'quantite' },
              { title: 'prix UHT', field: 'prix_uht', type: 'numeric'},
              { title: 'Wilaya', field: 'wilaya' },
              { title: 'Frais Livraison', field: 'frais_livraison', type: 'numeric'},
              { title: 'Centre mentage', field: 'centre_mentage'},
              { title: 'Total', field: 'total', type: 'numeric'}
            ],
            data:commandes,
          }) 
        
      }, [commandes]) 

      return (
        <MaterialTable
          style={{width:'100%', height:'100%'}}
          title="Liste des commandes"
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
              tooltip: 'supprimer',
              onClick: (event, rowData) => console.log(rowData)
            },
            {
              icon: ()=><EditIcon/>,
              tooltip: 'Modifier',
              onClick: (event, rowData) => console.log(rowData)
            }

          ]}
          options={{
            actionsColumnIndex: -1,
            selection: true
          }}
          components={{
            Container: props => <div style={{background: 'none'}}>{props.children}</div>
            }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  console.log(newData)
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
                  handleUpdateCommande(newData.nom_client, newData.prenom_client, newData.email, newData.telephone, newData.designation_pneu, newData.prix_uht, newData.quantite, newData.wilaya, newData.frais_livraison, newData.centre_mentage, newData.total, newData.date_commande, oldData.id_commande, oldData.code_commande)
                  if (oldData) {
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
                console.log(oldData)
                setTimeout(() => {
                  resolve();
                  handleDeleteCommande(oldData.id_commande, oldData.code_commande)
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
    );

}      
export default TableCommande;