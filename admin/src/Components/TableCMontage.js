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

const TableCMontage = () => {
    const [state, setState] = React.useState({
        columns: [
          { title: 'Centre', field: 'centre' },
          { title: 'Telephone', field: 'tel' },
          { title: 'Adresse', field: 'adresse' },
          { title: 'Ville', field: 'ville', lookup: { 34: 'Oran', 63: 'Alger', 64:'Tlemcen', 65:'S.Belabes', 66:'Ain Temouchent'  } },
          { title: 'Latitude', field: 'latitude', type:'numeric' },
          { title: 'longitude', field: 'longitude', type:'numeric' },
        ],
        data: [
          { centre: 'cc6225', tel: '06 61 74 34 21', adresse: '', ville: 34, latitude:43.54637, longitude:24.84664 },
          { centre: 'cc6225', tel: '06 61 74 34 21', adresse: '', ville: 63, latitude:31.76545, longitude:61.27278},
          { centre: 'cc6225', tel: '06 61 74 34 21', adresse: '', ville: 64, latitude:24.84664, longitude:43.54637 },
          { centre: 'cc6225', tel: '06 61 74 34 21', adresse: '', ville: 65, latitude:30.53453, longitude:30.53453 },
          { centre: 'cc6225', tel: '06 61 74 34 21', adresse: '', ville: 66, latitude:33.67353, longitude:31.76545 },
          { centre: 'cc6225', tel: '06 61 74 34 21', adresse: '', ville: 64, latitude:61.27278, longitude:33.67353 },
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
          title="Liste des Centres de montage"
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
export default TableCMontage;