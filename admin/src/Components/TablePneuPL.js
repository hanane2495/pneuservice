import React, {useEffect, useState, useRef} from 'react';
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
 import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
 import BeenhereIcon from '@material-ui/icons/Beenhere';
 import LocalOfferIcon from '@material-ui/icons/LocalOffer';

 import styled from 'styled-components';

 //components
 import MyVerticallyCenteredModalActive from './ModalActiverDesactiver';
 import MyVerticallyCenteredModalPromo from './ModalAddPromo';

 const Styles = styled.div`
 .MuiTableCell-root {
    padding: 0 10px !important;
    overflow:hidden; 
    white-space:nowrap; 
    text-overflow: ellipsis;
  }
 `
const TablePneu = () => {
  //Modal
  const [modalAddPromo, setModalAddPromo] = React.useState(false);
  const [modalActiverDesativer, setModalActiverDesativer] = React.useState(false);

  const [pneus, setPneus] = useState([])
  const [promo, setPromo] = useState({})
  const [state, setState] = React.useState({});
  const [initialFormData, setInitialFormData] = useState({})

  const [dataToUpdate, setDataToUpdate] = useState([])
  const [dataToUpdate1, setDataToUpdate1] = useState([])

  const materialTableRef = useRef(null)

    
    function handleDeletePneu(listPneu){
      axios.post(`${process.env.REACT_APP_API_URL}/delete/pneus/poids/lourd`, {listPneu})
      .then(res => {
        console.log(res.data.message)
      })
    }

    function handleUpdatePneu(categorie, type, position, marque, collection, largeur, hauteur, diametre, charge, vitesse, desoignation_pl, carburant, adherence, bruit, marge, promo , id_pneu_pl){
      axios.post(`${process.env.REACT_APP_API_URL}/update/pneus/poids/lourd`, {categorie, type, position, marque, collection, largeur, hauteur, diametre, charge, vitesse, desoignation_pl, carburant, adherence, bruit, marge, promo, id_pneu_pl})
      .then(res => {
        console.log(res.data.message)
      })
    }
    function handleAddPneu(categorie, type, position, marque, collection, largeur, hauteur, diametre, charge, vitesse, desoignation_pl, carburant, adherence, bruit, marge, promo){
      axios.post(`${process.env.REACT_APP_API_URL}/add/pneus/poids/lourd`, {categorie, type, position, marque, collection, largeur, hauteur, diametre, charge, vitesse, desoignation_pl, carburant, adherence, bruit, marge, promo})
      .then(res => {
        console.log(res.data.message)
      })
    }
    
    useEffect(() => {
      let pneu = []
      axios.post(`${process.env.REACT_APP_API_URL}/get/pneus/poids/lourd`)
      .then(res => { 
        pneu = res.data
        setPneus(pneu)
      })
      .catch(err => {
        console.log(err)
      })

       //get promos
      var pro = {}
      axios.post(`${process.env.REACT_APP_API_URL}/get/promo`)
      .then(res => { 
        res.data.map((prom) => {
          Object.defineProperty(pro, `${prom.valeur_promo}`, {value : `${prom.nom_promo} (-${prom.valeur_promo}%)`,
          writable : true,
          enumerable : true,
          configurable : true})
        })
        setPromo(pro)
      })
      .catch(err => {
        console.log(err)
      })
    }, []) 
    
    useEffect(() => {
        setState({
          columns: [
            { title: 'statut', field: 'statut', render: rowData => rowData.statut == 'Actif' ? <p style={{color:'#8BC34A'}}>{rowData.statut}</p> : <p style={{color:'red'}}>{rowData.statut}</p>},
            { title: 'promo', field: 'promo', render: rowData => rowData.promo == null ? null : <p style={{background:'#8BC34A', borderRadius:'50%', height:'40px', width:'40px', color:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>- {rowData.promo}%</p>},
            { title: 'Designation', field: 'designation_pl'},
            { title: 'Categorie', field: 'categorie'},
            { title: 'Collection', field: 'collection'},
            { title: 'Marque', field: 'marque'},
            { title: 'Type', field: 'type'},
            { title: 'Position', field: 'position'},
            { title: 'Largeur', field: 'largeur'},
            { title: 'Hauteur', field: 'hauteur' },
            { title: 'Diametre', field: 'diametre'},
            { title: 'Charge', field: 'charge'},
            { title: 'Vitesse', field: 'vitesse'},
            { title: 'carburant', field: 'carburant'},
            { title: 'adherence', field: 'adherence'},
            { title: 'bruit', field: 'bruit'},
            { title: 'marge', field: 'marge'}
          ],
          data:pneus,
        }) 
      
    }, [pneus]) 
      return (
        <Styles>
        <MaterialTable
          style={{width:'100%', height:'100%'}}
          title="Liste des Pneu Poids lourd"
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
            Save : () => <SaveIcon/>,
            Beenhere : ()=> <BeenhereIcon/>,
            LocalOffer : ()=> <LocalOfferIcon/>
          }}
          columns={state.columns}
          data={state.data}
          tableRef={materialTableRef}
          initialFormData={initialFormData}
          actions={[
            {
              icon: ()=> <LibraryAddIcon/>,
              tooltip: 'Dupliquer',
              position: "row",
              onClick: (event, rowData) => {
                const materialTable = materialTableRef.current;

                console.log(materialTableRef.current)
                console.log(rowData)

                
                setInitialFormData({
                    ...rowData,
                    nom : null
                });
                
                materialTable.dataManager.changeRowEditing();
                materialTable.setState({
                  ...materialTable.dataManager.getRenderState(),
                  showAddRow: true,
                });
              }
            },
            {
              icon: ()=> <BeenhereIcon/>,
              tooltip: 'activer/desactiver',
              onClick: (event, rowData) => {
                setModalActiverDesativer(true);
                setDataToUpdate(rowData)
              }
            },
            {
              icon: ()=> <LocalOfferIcon/>,
              tooltip: 'ajouter promo',
              onClick: (event, rowData) => {
                setModalAddPromo(true);
                setDataToUpdate1(rowData)
              }
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
                  handleAddPneu(newData.categorie, newData.type, newData.position, newData.marque, newData.collection, newData.largeur, newData.hauteur, newData.diametre, newData.charge, newData.vitesse, newData.desoignation_pl, newData.carburant, newData.adherence, newData.bruit, newData.marge, newData.promo)
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
                    handleUpdatePneu(newData.categorie, newData.type, newData.position, newData.marque, newData.collection, newData.largeur, newData.hauteur, newData.diametre, newData.charge, newData.vitesse, newData.desoignation_pl, newData.carburant, newData.adherence, newData.bruit, newData.marge, newData.promo , oldData.id_pneu_pl)
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
                  let listPneu = [oldData.id_pneu_pl]
                  handleDeletePneu(listPneu)
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
        <MyVerticallyCenteredModalActive
            show={modalActiverDesativer}
            onHide={() => setModalActiverDesativer(false)}
            dataToUpdate = {dataToUpdate}
            categorie = 'poids lourd'
        />
        <MyVerticallyCenteredModalPromo
            show={modalAddPromo}
            onHide={() => setModalAddPromo(false)}
            dataToUpdate = {dataToUpdate1}
            categorie = 'poids lourd'
        />
        </Styles>
    );

}      
export default TablePneu;