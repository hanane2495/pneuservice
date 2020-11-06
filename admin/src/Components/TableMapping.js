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

 import styled from 'styled-components';



 const Styles = styled.div`
 .MuiTableCell-root {
    padding: 0 10px !important;
    overflow:hidden; 
    white-space:nowrap; 
    text-overflow: ellipsis;
  }
 `

const TableMapping = () => {
    const [state, setState] = React.useState({
        columns: [
          { title: 'ID Pneu', field: 'id_pneu' },  
          { title: 'ID Supplier', field: 'id_supplier' },
          { title: 'Designation', field: 'designation' },

        ],
        data: [
          { id_pneu: '712', id_supplier: '10.516SW', designation: 'Michelin Latitude Sport 3 275/45 R19 108Y' },
          { id_pneu: '714', id_supplier: '100020M', designation: 'Hifly HF201 185/55 R15 82V'},
          { id_pneu: '332', id_supplier: 'cc6225', designation: 'Cooper CS2 175/70 R14 84T' },
          { id_pneu: '715', id_supplier: '10.516SW', designation: 'Michelin Latitude Sport 3 275/45 R19 108Y' },
          { id_pneu: '614', id_supplier: 'cc6225', designation: 'Michelin XL 12.5R20 139G' },
          { id_pneu: '514', id_supplier: '100020M', designation: 'Hifly HF201 185/55 R15 82V' },
          
        ],
      });
      return (
        <Styles>
        <MaterialTable
          style={{width:'100%', height:'100%'}}
          title="Les Produits non Mappées"
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
            }
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
export default TableMapping;