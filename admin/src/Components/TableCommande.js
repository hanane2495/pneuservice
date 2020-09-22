import React from 'react';
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

const TableCommande = () => {
    const [state, setState] = React.useState({
        columns: [
          { title: 'Code', field: 'code' },
          { title: 'Client', field: 'client' },
          { title: 'Montant (Da)', field: 'montant', type: 'numeric' },
          { title: 'Produits [code]', field: 'produits' },
          { title: 'Qt', field: 'qt' },
          { title: 'Etat', field: 'etat', lookup: { 34: 'livree', 63: 'en attente' }},

        ],
        data: [
          { code: 'cc6225', client: 'Baran', montant: 16000, produits: '195R14C, 195R14C, 195R14C', qt:4, etat:63 },
          { code: 'cc6225', client: 'Baran', montant: 16000, produits: '195R14C, 195R14C, 195R14C', qt:4, etat:63},
          { code: 'cc6225', client: 'Baran', montant: 16000, produits: '195R14C, 195R14C, 195R14C', qt:4, etat:63 },
          { code: 'cc6225', client: 'Baran', montant: 16000, produits: '195R14C, 195R14C, 195R14C', qt:4, etat:63 },
          { code: 'cc6225', client: 'Baran', montant: 16000, produits: '195R14C, 195R14C, 195R14C', qt:4, etat:34 },
          { code: 'cc6225', client: 'Baran', montant: 16000, produits: '195R14C, 195R14C, 195R14C', qt:4, etat:34 },
          {
            code: 'cc6225',
            client: 'Baran',
            montant: 16000,
            produits: '195R14C, 195R14C, 195R14C',
            qt:4,
            etat:34
          },
        ],
      });
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
    );

}      
export default TableCommande;