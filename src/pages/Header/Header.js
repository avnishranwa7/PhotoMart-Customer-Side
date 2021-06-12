import React, {useState, useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import db from '../../firebase';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
//   title: {
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [name, setName] = useState('');
  const [data, setdata] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    let arr = [];
    db.collection("photographers").get().then(
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arr.push({id: doc.id, data: doc.data()})
    
    })
    setdata(arr);
  }
    
    )}, [])

  function search(){
    let arr = [];
    db.collection("photographers").get().then(
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
              if(doc.data().Name.search(name)>=0){
                arr.push({id: doc.id, data: doc.data()});
              }
          });
          setdata(arr);
      }
      )
    
  }

  return (
    <div className={classes.grow} style={{marginLeft: '-2vw'}}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Grapher-Mart
          </Typography>
          <div className={classes.search} style={{marginLeft: '60vw'}}>
            
            <InputBase
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setName(e.target.value)}
            />
            <Button style={{color: 'white', height: '5vh'}} onClick={search}><div className={classes.searchIcon}>
              <SearchIcon />
            </div></Button>
          </div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      {/* <MediaCard data={data}/> */}
    </div>
  );
}
