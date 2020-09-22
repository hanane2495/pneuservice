import React, { useState } from 'react';
import MaterialTable from 'material-table';

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

const TableFournisseur = () => {

    const [modalShowStock, setModalShowStock] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [Fournisseur, setFournisseur] = React.useState('');

    const [state, setState] = React.useState({
        columns: [
          { title: 'Code', field: 'code' },
          { title: 'Fournisseur', field: 'fournisseur' },
          { title: 'Telephone', field: 'telephone'},
          { title: 'Adresse', field: 'adresse' },
        ],
        data: [
          { code: 'F001', fournisseur: 'Baran', telephone: '05 57 93 20 82', adresse: ''  },
          { code: 'F002', fournisseur: 'Baran', telephone: '05 57 93 20 82', adresse: '' },
        ],
      });
      return (
         <React.Fragment> 
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
                onClick: (event, rowData) => {setModalShowStock(true); setFournisseur(rowData.code); console.log( rowData.code )}
            },
            {
                icon: ()=><AccountTreeIcon/>,
                tooltip: 'Tous les produits',
                onClick: (event, rowData) => {setModalShow(true); setFournisseur(rowData.code); console.log( rowData.code )}
            }

          ]}
          options={{
            actionsColumnIndex: -1,
          }}
          components={{
            Container: props => <div style={{background: 'none'}}>{props.children}</div>
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
        <MyVerticallyCenteredModalStock
            show={modalShowStock}
            onHide={() => setModalShowStock(false)}
            fournisseur = {Fournisseur}
        />
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            fournisseur = {Fournisseur}
        />
      </React.Fragment>
    );

}      
export default TableFournisseur;