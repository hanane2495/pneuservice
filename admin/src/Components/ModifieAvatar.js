import React, { useState, useEffect } from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'

//images 
import profile from '../assets/profile1.jpg';

//icons 
import {MdPhotoCamera} from 'react-icons/md'

//fonction
import { isAuth } from "../helpers/auth";



const Styles = styled.div`
  .custom-file-input {
    opacity:0;
}
  .custom-file-label{
    display:block;
    background:red;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function BadgeAvatars(props) {

  const classes = useStyles();
  const hiddenFileInput = React.useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  return (
    <div className={classes.root}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={
            <Styles>
              <MdPhotoCamera onClick={handleClick} style={{height:'35px', width:'35px', background:'#fff', borderRadius:'50px', border:'solid #fff', color:'#777'}}/>
              <input
                type='file'
                ref={hiddenFileInput}
                id='inputGroupFile04'
                onChange={props.upload}
                style={{display:'none'}}
              />
            </Styles>
        }
      >
        <Avatar alt={props.image.name} src={`http://localhost:5000/${props.image.path}`} style={{height:'150px', width:'150px'}}/>
      </Badge>
    </div>
  );
}