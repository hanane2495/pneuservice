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
 import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
 import BeenhereIcon from '@material-ui/icons/Beenhere';
 import LocalOfferIcon from '@material-ui/icons/LocalOffer';

 import styled from 'styled-components';

//components
import MyVerticallyCenteredModalImage from './ModalModifierImage'
import MyVerticallyCenteredModalActive from './ModalActiverDesactiver';
import MyVerticallyCenteredModalPromo from './ModalAddPromo';

 const Styles = styled.div`
 .MuiTableCell-root {
    padding: 2px !important;
    overflow:hidden; 
    white-space:nowrap; 
    text-overflow: ellipsis;
  }
 `

const TableCMontage = (props) => {
  const [modalAddPromo, setModalAddPromo] = React.useState(false);
  const [modalActiverDesativer, setModalActiverDesativer] = React.useState(false);
  const [modalShowImage, setModalShowImage] = React.useState(false);


  const [collection, setCollection] = useState([])
  const [state, setState] = React.useState({});
  const [dataToUpdate, setDataToUpdate] = useState([])
  const [dataToUpdate1, setDataToUpdate1] = useState([])

  const [images, setImages] = useState({
    image_pneu : '',
    image_1 : '',
    image_2 : ''
  })

  const [promo, setPromo] = useState({})

  const [collect, setCollect] =  useState('') 
    
    function handleDeleteCollection(listCollection, categorie){
      axios.post(`${process.env.REACT_APP_API_URL}/delete/collection`, {listCollection, categorie})
      .then(res => {
        console.log('deleted')
        console.log(res.data.message)
      })
    }

    function handleUpdateCollection(statut, promo, gamme, usage, point_fort1, point_fort2, point_fort3, description, collection, categorie){
      axios.post(`${process.env.REACT_APP_API_URL}/update/collection`, {statut, promo, gamme, usage, point_fort1, point_fort2, point_fort3, description, collection, categorie})
      .then(res => {
        console.log('updated')
        console.log(res.data.message)
      })
    }
  
    useEffect(() => {
      let col = []
      const categorie = props.categorie;
      axios.post(`${process.env.REACT_APP_API_URL}/get/collection`, {categorie})
      .then(res => { 
        col = res.data
        console.log(res.data)
        setCollection(col)
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
        console.log(res.data)
        setPromo(pro)
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
            { title: 'statut', field: 'statut', render: rowData => rowData.statut == 'Actif' ? <p style={{color:'#8BC34A'}}>{rowData.statut}</p> : <p style={{color:'red'}}>{rowData.statut}</p>},
            { title: 'promo', field: 'promo', render: rowData => rowData.promo == null ? null : <p style={{background:'#8BC34A', borderRadius:'50%', height:'40px', width:'40px', color:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>- {rowData.promo}%</p>},
            { title: 'Collection', field: 'collection'},
            { title: 'Marque', field: 'marque'},
            { title: 'Gamme', field: 'gamme'},
            { title: 'Usage', field: 'usage'},
            { title: 'Description', field: 'description'},
            { title: 'Points forts 1', field: 'point_fort1'},
            { title: 'Points forts 2', field: 'point_fort2'},
            { title: 'Points forts 3', field: 'point_fort3'}
          ],
          data:collection,
        }) 
      
    }, [collection]) 

      return (
        <Styles>
        <MaterialTable
          style={{width:'100%', height:'100%'}}
          title="Liste des collection"
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
          actions={[
            {
                icon: () => <InsertPhotoIcon />,
                position: "row",
                tooltip: 'Edit images',
                onClick: (event, rowData) => {console.log(rowData); setModalShowImage(true);setCollect(rowData.collection); setImages({image_pneu : rowData.image_pneu, image_1 : rowData.image_1, image_2 : rowData.image_2})}
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
                console.log(rowData)
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
          components={{
            Container: props => <div style={{background: 'none'}}>{props.children}</div>
            }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    console.log(oldData)
                    handleUpdateCollection(newData.statut, newData.promo, newData.gamme, newData.usage, newData.point_fort1, newData.point_fort2, newData.point_fort3, newData.description, oldData.collection, props.categorie)
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
                  let listCollection = [oldData.collection]
                  handleDeleteCollection(listCollection, props.categorie)
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
        <MyVerticallyCenteredModalImage
            show={modalShowImage}
            onHide={() => setModalShowImage(false)}
            images = {images}
            collection = {collect}
            categorie = {props.categorie}
        />
        <MyVerticallyCenteredModalActive
            show={modalActiverDesativer}
            onHide={() => setModalActiverDesativer(false)}
            dataToUpdate = {dataToUpdate}
            categorieCol = {props.categorie}
            categorie = 'collection'
        />
        <MyVerticallyCenteredModalPromo
            show={modalAddPromo}
            onHide={() => setModalAddPromo(false)}
            dataToUpdate = {dataToUpdate1}
            categorieCol = {props.categorie}
            categorie = 'collection'
        />
      </Styles>
    );

}      
export default TableCMontage;


/**
 *  onRowAdd: (newData) =>
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
 */