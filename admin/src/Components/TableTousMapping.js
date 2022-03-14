import React, {useState, useEffect} from 'react';
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

const TableMapping = (props) => {
  const [produit, setFournisseurs] = useState([])
  const [state, setState] = React.useState({});
  

//________________________________mapper produits non mappee___________________________________

  function handleAddMapping(id_pneu_service, suppliers_code, designation, id_fournisseur){
    axios.post(`${process.env.REACT_APP_API_URL}/add/mapping`, {id_pneu_service, suppliers_code, designation, id_fournisseur})
    .then(res => {
      console.log(res.data.message)
    })
  }

  useEffect(() => {
    setState({
      columns: [
        { title: 'ID pneu fournisseur', field: 'suppliers_code'},  
        { title: 'ID fournisseur', field: 'id_fournisseur'},
        { title: 'Designation', field: 'designation'},
        { title: 'ID pneu service', field: 'id_pneu_service'},

      ],
      data:props.produits_non_mappee,
    }) 
  
}, [props.produits_non_mappee]) 

//_________________________________________fin mapping_________________________________________
    
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
                    handleAddMapping(newData.id_pneu_service, oldData.suppliers_code, newData.designation, oldData.id_fournisseur)
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