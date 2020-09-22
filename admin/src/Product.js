import React from "react";
import styled from 'styled-components';

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
 import LocalOfferIcon from '@material-ui/icons/LocalOffer';



//components


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
    const [state, setState] = React.useState({
        columns: [
          { title: 'ID pneu', field: 'id_pneu' },
          { title: 'Designation', field: 'designation' },
          { title: 'Marque', field: 'marque' },
          { title: 'Collection', field: 'collection' },
          { title: 'Type', field: 'type' },
          { title: 'Largeur', field: 'largeur' },
          { title: 'Hauteur', field: 'hauteur' },
          { title: 'Diametre', field: 'diametre' },
          { title: 'Charge', field: 'charge' },
          { title: 'Vitesse', field: 'vitesse' },
          { title: 'Marge', field: 'marge' },
        ],
        data: [
          { id_pneu: '712', designation: 'Michelin Latitude Sport 3 275/45 R19 108Y', marque: 'Vredestein', collection: 'V48', type:'PNT', largeur:'21', hauteur:'8', diametre:'10', charge:'96', vitesse:'M', marge:'0' },
          { id_pneu: '712', designation: 'Michelin Latitude Sport 3 275/45 R19 108Y', marque: 'Vredestein', collection: 'V48', type:'PNT', largeur:'21', hauteur:'8', diametre:'10', charge:'96', vitesse:'M', marge:'0' },
          { id_pneu: '712', designation: 'Michelin Latitude Sport 3 275/45 R19 108Y', marque: 'Vredestein', collection: 'V48', type:'PNT', largeur:'21', hauteur:'8', diametre:'10', charge:'96', vitesse:'M', marge:'0' },
          { id_pneu: '712', designation: 'Michelin Latitude Sport 3 275/45 R19 108Y', marque: 'Vredestein', collection: 'V48', type:'PNT', largeur:'21', hauteur:'8', diametre:'10', charge:'96', vitesse:'M', marge:'0' },
          { id_pneu: '712', designation: 'Michelin Latitude Sport 3 275/45 R19 108Y', marque: 'Vredestein', collection: 'V48', type:'PNT', largeur:'21', hauteur:'8', diametre:'10', charge:'96', vitesse:'M', marge:'0' },
          { id_pneu: '712', designation: 'Michelin Latitude Sport 3 275/45 R19 108Y', marque: 'Vredestein', collection: 'V48', type:'PNT', largeur:'21', hauteur:'8', diametre:'10', charge:'96', vitesse:'M', marge:'0' },
          
        ],
      });
    return(
        <React.Fragment>
            <Styles>
                <div className='table-commandes'>
                <MaterialTable
          style={{width:'100%', height:'100%'}}
          title="Products F-001"
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
                icon: ()=><LocalOfferIcon/>,
                tooltip: 'Ajouter promo',
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