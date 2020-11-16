import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'

//icons
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
 import StoreIcon from '@material-ui/icons/Store';
 import AccountTreeIcon from '@material-ui/icons/AccountTree';

 //components
 import MyVerticallyCenteredModal from './ModalMapping';
 import MyVerticallyCenteredModalStock from './ModalStock';

 import styled from 'styled-components';



 const Styles = styled.div`
 .MuiTableCell-root {
    padding: 10px !important;
    overflow:hidden; 
    white-space:nowrap; 
    text-overflow: ellipsis;
  }
 `

const TableFournisseur = () => {

  const [modalShowStock, setModalShowStock] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const [fournisseurs, setFournisseurs] = useState([])
  const [state, setState] = React.useState({});
    
    function handleDeleteFournisseur(listFournisseurs){
      axios.post(`${process.env.REACT_APP_API_URL}/delete/Fournisseur`, {listFournisseurs})
      .then(res => {
        console.log(res.data.message)
      })
    }

    function handleUpdateFournisseur(nom, prenom, email, telephone, adresse, banque, agence, nis, matricule_fiscale, n_registre, n_article_imposition, forme_juridique, raison_sociale, numero_rib, cle_rib , id_fournisseur){
      axios.post(`${process.env.REACT_APP_API_URL}/update/Fournisseur`, {nom, prenom, email, telephone, adresse, banque, agence, nis, matricule_fiscale, n_registre, n_article_imposition, forme_juridique, raison_sociale, numero_rib, cle_rib , id_fournisseur})
      .then(res => {
        console.log(res.data.message)
      })
    }
    function handleAddFournisseur(nom, prenom, email, telephone, adresse, banque, agence, nis, matricule_fiscale, n_registre, n_article_imposition, forme_juridique, raison_sociale, numero_rib, cle_rib){
      axios.post(`${process.env.REACT_APP_API_URL}/add/Fournisseur`, {nom, prenom, email, telephone, adresse, banque, agence, nis, matricule_fiscale, n_registre, n_article_imposition, forme_juridique, raison_sociale, numero_rib, cle_rib})
      .then(res => {
        console.log(res.data.message)
      })
    }
    
    useEffect(() => {
      let four = []
      axios.post(`${process.env.REACT_APP_API_URL}/get/Fournisseur`)
      .then(res => { 
        four = res.data
        setFournisseurs(four)
      })
      .catch(err => {
        console.log(err)
      })
    }, []) 
    
    useEffect(() => {
        setState({
          columns: [
            { title: 'Nom Fournisseur', field: 'nom'},
            { title: 'Prenom Fournisseur', field: 'prenom'},
            { title: 'Email', field: 'email'},
            { title: 'Adresse', field: 'adresse'},
            { title: 'Telephone', field: 'telephone'},
            { title: 'Banque', field: 'banque'},
            { title: 'Agence', field: 'agence'},
            { title: 'NIS', field: 'nis' },
            { title: 'Matricule Fiscale', field: 'matricule_fiscale'},
            { title: 'N°Registre', field: 'n_registre'},
            { title: 'N°Article impos', field: 'n_article_imposition'},
            { title: 'Forme Juridique', field: 'forme_juridique'},
            { title: 'Raison Social', field: 'raison_sociale'},
            { title: 'N°RIB', field: 'numero_rib'},
            { title: 'Cle Rib', field: 'cle_rib'},
          ],
          data:fournisseurs,
        }) 
      
    }, [fournisseurs]) 

    const [codeFournisseur, setCodeFournisseur] = React.useState('');

      return (
         <Styles>
        <MaterialTable
          style={{width:'100%', height:'100%'}}
          title="Liste des Fournisseurs"
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
                icon: () => <StoreIcon />,
                tooltip: 'Ajouter Stock',
                onClick: (event, rowData) => {setModalShowStock(true); setCodeFournisseur(rowData.id_fournisseur); console.log( rowData.code )}
            },
            {
                icon: ()=><AccountTreeIcon/>,
                tooltip: 'Tous les produits',
                onClick: (event, rowData) => {setModalShow(true); setCodeFournisseur(rowData.id_fournisseur); console.log( rowData.code )}
            }

          ]}
          options={{
            rowStyle: {
              height: '10px',
            }
          }}
          components={{
            Container: props => <div style={{background: 'none'}}>{props.children}</div>
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  handleAddFournisseur(newData.nom, newData.prenom, newData.email, newData.telephone, newData.adresse, newData.banque, newData.agence, newData.nis, newData.matricule_fiscale, newData.n_registre, newData.n_article_imposition, newData.forme_juridique, newData.raison_sociale, newData.numero_rib, newData.cle_rib)
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
                    handleUpdateFournisseur(newData.nom, newData.prenom, newData.email, newData.telephone, newData.adresse, newData.banque, newData.agence, newData.nis, newData.matricule_fiscale, newData.n_registre, newData.n_article_imposition, newData.forme_juridique, newData.raison_sociale, newData.numero_rib, newData.cle_rib , oldData.id_fournisseur)
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
                  let listFournisseurs = [oldData.id_fournisseur]
                  handleDeleteFournisseur(listFournisseurs)
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
        <MyVerticallyCenteredModalStock
            show={modalShowStock}
            onHide={() => setModalShowStock(false)}
            fournisseur = {codeFournisseur}
        />
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            fournisseur = {codeFournisseur}
        />
      </Styles>    
   );

}      
export default TableFournisseur;