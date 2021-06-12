import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default function SingleLineGridList(props) {
  const classes = useStyles();
  
  return (
    <div style={{marginTop: '-3vh'}}>
      <br/>
      <br/>
      {/* <GridList className={classes.gridList} cols={4.6}>
        {props.photos.map((tile) => (
          <GridListTile key={tile.name}>
            <img src={tile.url} style={{maxWidth: '20vw'}}/>
          </GridListTile>
        ))}
      </GridList> */}
      {props.photos.map((tile) => (
        <div style={{display: 'inline-block'}}><img src={tile.url} height='170vh' width='250vw'/>&nbsp;&nbsp;</div>
      ))}
      
    </div>
  );
}