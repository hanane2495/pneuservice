import React, {useEffect} from 'react';
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

 import styled from 'styled-components';



 const Styles = styled.div`
 .MuiTableCell-root {
    padding: 0 10px !important;
    overflow:hidden; 
    white-space:nowrap; 
    text-overflow: ellipsis;
  }
 `

const TableStock = (props) => {

  const [state, setState] = React.useState({});
    
    function handleDeleteProduit(listFournisseurs){
      axios.post(`${process.env.REACT_APP_API_URL}/delete/Fournisseur`, {listFournisseurs})
      .then(res => {
        console.log(res.data.message)
      })
    }

    function handleUpdateProduit(nom, prenom, email, telephone, adresse, banque, agence, nis, matricule_fiscale, n_registre, n_article_imposition, forme_juridique, raison_sociale, numero_rib, cle_rib , id_fournisseur){
      axios.post(`${process.env.REACT_APP_API_URL}/update/Fournisseur`, {nom, prenom, email, telephone, adresse, banque, agence, nis, matricule_fiscale, n_registre, n_article_imposition, forme_juridique, raison_sociale, numero_rib, cle_rib , id_fournisseur})
      .then(res => {
        console.log(res.data.message)
      })
    }
    function handleAddProduit(nom, prenom, email, telephone, adresse, banque, agence, nis, matricule_fiscale, n_registre, n_article_imposition, forme_juridique, raison_sociale, numero_rib, cle_rib){
      axios.post(`${process.env.REACT_APP_API_URL}/add/Fournisseur`, {nom, prenom, email, telephone, adresse, banque, agence, nis, matricule_fiscale, n_registre, n_article_imposition, forme_juridique, raison_sociale, numero_rib, cle_rib})
      .then(res => {
        console.log(res.data.message)
      })
    }
    
    useEffect(() => {
        setState({
          columns: [
            { title: 'suppliers_code', field: 'suppliers_code'},
            { title: 'designation', field: 'designation'},
            { title: 'qte', field: 'qte'},
            { title: 'price', field: 'price'},
          ],
          data:props.stock,
        }) 
      console.log(props.stock)
    }, []) 
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
              icon: () => <SaveAlt />,
              tooltip: 'Telecharger',
              onClick: (event, rowData) => alert("You saved " + rowData.name)
            },
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
            selection: true,
            rowStyle: {
              height: '10px',
            },
            filtering: true
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
export default TableStock;