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
import MyVerticallyCenteredModalImage from './ModalMarque'
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
  const [modalShow, setModalShow] = React.useState(false);


  const [marques, setMarques] = useState([])
  const [state, setState] = React.useState({});
  const [dataToUpdate, setDataToUpdate] = useState([])
  const [dataToUpdate1, setDataToUpdate1] = useState([])

  const [images, setImages] = useState({
    marque_img: '',
  })

  const [marq, setMarq] =  useState('') 
  const [promo, setPromo] = useState({})

    
    function handleDeleteCollection(listMarque, categorie){
      axios.post(`${process.env.REACT_APP_API_URL}/delete/marque`, {listMarque, categorie})
      .then(res => {
        console.log('deleted')
        console.log(res.data.message)
      })
    }

    function handleUpdateMarqueInfo(promo, statut, marque){
      const categorie = props.categorie;
      axios.post(`${process.env.REACT_APP_API_URL}/update/marque/info`, {promo, statut, marque, categorie})
      .then(res => {
        console.log('updated')
        console.log(res.data.message)
      })
    }
    
    useEffect(() => {
      let col = []
      const categorie = props.categorie;
      axios.post(`${process.env.REACT_APP_API_URL}/get/marque`, {categorie})
      .then(res => { 
        console.log(res.data)
        col = res.data
        setMarques(col)
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
        setState({
          columns: [
            { title: 'statut', field: 'statut', render: rowData => rowData.statut == 'Actif' ? <p style={{color:'#8BC34A'}}>{rowData.statut}</p> : <p style={{color:'red'}}>{rowData.statut}</p>},
            { title: 'promo', field: 'promo', render: rowData => rowData.promo == null ? null : <p style={{background:'#8BC34A', borderRadius:'50%', height:'40px', width:'40px', color:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>- {rowData.promo}%</p>},
            { title: 'Marque', field: 'marque'},
            { title: 'Image', field: 'marque_img', render: rowData => <img src={`${process.env.REACT_APP_API_URL}/${rowData.marque_img}`} style={{width: 100, height:50}}/>},
          ],
          data:marques,
        }) 
      
    }, [marques]) 

      return (
        <Styles>
        <MaterialTable
          style={{width:'100%', height:'100%'}}
          title="Liste des Marques"
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
                icon: () => <InsertPhotoIcon />,
                position: "row",
                tooltip: 'Edit images',
                onClick: (event, rowData) => {console.log(rowData); setModalShowImage(true);setMarq(rowData.marque); setImages({marque_img : rowData.marque_img})}
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
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  let listMarque = [oldData.marque]
                  handleDeleteCollection(listMarque, props.categorie)
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
              onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                      console.log(oldData)
                    handleUpdateMarqueInfo(newData.promo, newData.statut, oldData.marque)
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
          }}
        />
        <MyVerticallyCenteredModalImage
            show={modalShowImage}
            onHide={() => setModalShowImage(false)}
            images = {images}
            setImages = {setImages}
            marque = {marq}
            categorie = {props.categorie}
        />
        <MyVerticallyCenteredModalActive
            show={modalActiverDesativer}
            onHide={() => setModalActiverDesativer(false)}
            dataToUpdate = {dataToUpdate}
            categorieCol = {props.categorie}
            categorie = 'marque'
        />
        <MyVerticallyCenteredModalPromo
            show={modalAddPromo}
            onHide={() => setModalAddPromo(false)}
            dataToUpdate = {dataToUpdate1}
            categorieCol = {props.categorie}
            categorie = 'marque'
        />
      </Styles>
    );

}      
export default TableCMontage;


