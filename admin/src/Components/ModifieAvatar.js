import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

//images 
import profile from '../assets/profile1.jpg';

//icons 
import {MdPhotoCamera} from 'react-icons/md'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function BadgeAvatars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={<MdPhotoCamera style={{height:'35px', width:'35px', background:'#fff', borderRadius:'50px', border:'solid #fff', color:'#777'}}/>}
      >
        <Avatar alt="Djelloul Boubekri" src={profile} style={{height:'150px', width:'150px'}}/>
      </Badge>
    </div>
  );
}