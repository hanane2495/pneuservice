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

const TableStock = () => {
    const [state, setState] = React.useState({
        columns: [
          { title: 'ID supplier', field: 'code_fournisseur' },
          { title: 'Designation', field: 'designation' },
          { title: 'Prix', field: 'prix' },
          { title: 'Qt', field: 'qt' },

        ],
        data: [
          { code_fournisseur: '10.516SW', designation: 'Michelin Latitude Sport 3 275/45 R19 108Y', prix: 16000, qt: '0' },
          { code_fournisseur: '100020M', designation: 'Hifly HF201 185/55 R15 82V', prix: 16000, qt: '40'},
          { code_fournisseur: 'cc6225', designation: 'Cooper CS2 175/70 R14 84T', prix: 16000, qt: '28' },
          { code_fournisseur: '10.516SW', designation: 'Michelin Latitude Sport 3 275/45 R19 108Y', prix: 16000, qt: '30' },
          { code_fournisseur: 'cc6225', designation: 'Michelin XL 12.5R20 139G', prix: 16000, qt: '0' },
          { code_fournisseur: '100020M', designation: 'Hifly HF201 185/55 R15 82V', prix: 16000, qt: '46' },
          
        ],
      });
      return (
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
export default TableStock;