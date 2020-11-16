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
 import WallpaperIcon from '@material-ui/icons/Wallpaper';

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

  const [promo, setPromo] = useState([])
  const [state, setState] = React.useState({});
    
    function handleDeletePromo(listpromo){
      axios.post(`${process.env.REACT_APP_API_URL}/delete/promo`, {listpromo})
      .then(res => {
        console.log(res.data.message)
      })
    }

    function handleUpdatePromo(nom_promo, slogan_promo, valeur_promo, type_promo, code_promo, id_promo){
      axios.post(`${process.env.REACT_APP_API_URL}/update/promo`, {nom_promo, slogan_promo, valeur_promo, type_promo, code_promo, id_promo})
      .then(res => {
        console.log(res.data.message)
      })
    }
    function handleAddPromo(nom_promo, slogan_promo, valeur_promo, type_promo, code_promo){
      axios.post(`${process.env.REACT_APP_API_URL}/add/promo`, {nom_promo, slogan_promo, valeur_promo, type_promo, code_promo})
      .then(res => {
        console.log(res.data.message)
      })
    }
    
    useEffect(() => {
      let pro = []
      axios.post(`${process.env.REACT_APP_API_URL}/get/promo`)
      .then(res => { 
        pro = res.data
        setPromo(pro)
      })
      .catch(err => {
        console.log(err)
      })
    }, []) 
    
    useEffect(() => {
        setState({
          columns: [
            { title: 'Label Promo', field: 'nom_promo'},
            { title: 'Slogan', field: 'slogan_promo'},
            { title: 'Valeur', field: 'valeur_promo'},
            { title: 'Type', field: 'type_promo'},
            { title: 'Code Promo', field: 'code_promo'},
            { title: 'Date debut', field: 'date_ajout'},
            { title: 'Date fin', field: 'date_fin' }
          ],
          data:promo,
        }) 
      
    }, [promo]) 


      return (
         <Styles>
        <MaterialTable
          style={{width:'100%', height:'100%'}}
          title="Mes Promos"
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
                  handleAddPromo(newData.nom_promo, newData.slogan_promo, newData.valeur_promo, newData.type_promo, newData.code_promo)
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
                    handleUpdatePromo(newData.nom_promo, newData.slogan_promo, newData.valeur_promo, newData.type_promo, newData.code_promo, oldData.id_promo)
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
                  let listpromo = [oldData.id_promo]
                  handleDeletePromo(listpromo)
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
export default TableFournisseur;