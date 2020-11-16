import React, {useEffect, useState} from 'react';
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
    padding: 2px !important;
    overflow:hidden; 
    white-space:nowrap; 
    text-overflow: ellipsis;
  }
 `

const TableCMontage = () => {
  const [centreMontage, setCentreMontage] = useState([])
  const [state, setState] = React.useState({});

   
    function trueFalse(service){
      if(service === 'true'){
        console.log(service)
        return true
      }else return false
    }
    
    function handleDeleteCentreMontage(listCentreMontage){
      axios.post(`${process.env.REACT_APP_API_URL}/delete/centre/montage`, {listCentreMontage})
      .then(res => {
        console.log(res.data.message)
      })
    }

    function handleUpdateCentreMontage(nom, ville, telephone, adresse, montage, equilibrage, parallelisme, reparation, latitude, longitude, id_centre_montage){
      axios.post(`${process.env.REACT_APP_API_URL}/update/centre/montage`, {nom, ville, telephone, adresse, montage, equilibrage, parallelisme, reparation, latitude, longitude, id_centre_montage})
      .then(res => {
        console.log(res.data.message)
      })
    }
    function handleAddCentreMontage(nom, ville, telephone, adresse, montage, equilibrage, parallelisme, reparation, latitude, longitude){
      axios.post(`${process.env.REACT_APP_API_URL}/ajouter/centre/montage`, {nom, ville, telephone, adresse, montage, equilibrage, parallelisme, reparation, latitude, longitude})
      .then(res => {
        console.log(res.data.message)
      })
    }
    
    useEffect(() => {
      let cm = []
      axios.post(`${process.env.REACT_APP_API_URL}/get/all/centre/montage`)
      .then(res => { 
        cm = res.data
        setCentreMontage(cm)
      })
      .catch(err => {
        console.log(err)
      })
    }, []) 
    
    useEffect(() => {
    //nom, ville, telephone, adresse, montage, equilibrage, parallelisme, 
    //reparation, latitude, longitude
        setState({
          columns: [
            { title: 'Le Centre', field: 'nom'},
            { title: 'Ville', field: 'ville'},
            { title: 'Telephone', field: 'telephone'},
            { title: 'Adresse', field: 'adresse'},
            { title: 'montage', field: 'montage', lookup: { true: 'Oui', false: 'Non', null:'' }},
            { title: 'equilibrage', field: 'equilibrage',  lookup: { true: 'Oui', false : 'Non', null:'' }},
            { title: 'parallelisme', field: 'parallelisme',  lookup: { true: 'Oui', false : 'Non', null:'' }},
            { title: 'reparation', field: 'reparation',  lookup: { true: 'Oui', false : 'Non', null:'' }},
            { title: 'latitude', field: 'latitude'},
            { title: 'longitude', field: 'longitude'}
          ],
          data:centreMontage,
        }) 
      
    }, [centreMontage]) 

      return (
        <Styles>
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
         
          options={{
            actionsColumnIndex: -1,
            selection: true,
          }}
          components={{
            Container: props => <div style={{background: 'none'}}>{props.children}</div>
            }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  handleAddCentreMontage(newData.nom, newData.ville, newData.telephone, newData.adresse, trueFalse(newData.montage), trueFalse(newData.equilibrage), trueFalse(newData.parallelisme), trueFalse(newData.reparation), newData.latitude, newData.longitude)
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
                    console.log(newData.montage)
                    handleUpdateCentreMontage(newData.nom, newData.ville, newData.telephone, newData.adresse, trueFalse(newData.montage), trueFalse(newData.equilibrage), trueFalse(newData.parallelisme), trueFalse(newData.reparation), newData.latitude, newData.longitude, oldData.id_centre_montage)
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
                  let listCentreMontage = [oldData.id_centre_montage]
                  handleDeleteCentreMontage(listCentreMontage)
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
export default TableCMontage;