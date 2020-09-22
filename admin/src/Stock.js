import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {Form } from 'react-bootstrap';
import axios from 'axios';



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


//components
import TableCommande from './Components/TableCommande';


const Styles = styled.div`
 height:100%;
 padding:0.5% 1.5%;
  .table-commandes{
    padding: 1%;
    height:520px;
    background:white;
    overflow-y:auto;
    border-radius:15px;
    box-shadow:5px 10px 20px 1px rgba(0, 0, 0, 0.153);

    &::-webkit-scrollbar{
        width: 5px;
        height: 1%;
        background: #fff;
        border-radius:15px;
        margin-left: 2px;
    }

    &::-webkit-scrollbar-thumb{
        border-radius: 15px;
        background-color: #aaa;
    }

  }
`;


const Commande = () => {

  const [data, setData] = useState({ pneus: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=redux',
      );
 
      setData(result.data);
    };
 
    fetchData();
  }, []);

  const [state, setState] = useState({
        columns: [
          { title: 'ID supplier', field: 'code_fournisseur' },
          { title: 'Prix', field: 'prix' },
          { title: 'Qt', field: 'qt' },
          { title: 'ID Pneu', field: 'id_pneu' },
        ],
        data: data.pneus,
      });

    return(
        <React.Fragment>
            <Styles>
                <div className='table-commandes'>
                <div>
        <h6>Ajouter un nouveau stock </h6>
        <Form style={{marginBottom:'5%'}}>
          <Form.File 
            id="custom-file"
            label="cliquer pour inserer"
            custom
          />
        </Form>
      </div>
                <MaterialTable
          style={{width:'100%', height:'100%'}}
          title="Stock F-001"
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
                </div>        
            </Styles>
        </React.Fragment>
        
        
    )
}

export default Commande;