import React, {useState, useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SingleLineGridList from '../Customer/photos';
import Grid from '@material-ui/core/Grid';
import dpp from '../../dpp1.jpg';
import Paper from '@material-ui/core/Paper';
import db, {auth} from '../../firebase';
import './Card.css';
import csc from 'country-state-city';
import Photog_login from '../Login/Login';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles1 = makeStyles({
  root: {
    maxWidth: 200,
    width: 300,
  },
  media: {
    height: 150,
  },
});

const useStyles2 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: 'black',
      backgroundColor: 'white',
      marginTop: '3vh',
    },
  }));

const useStyles3 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const useStyles0 = makeStyles((theme) => ({
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

export default function MediaCard(props) {
  const [user, setuser] = useState({});
  const [loginpage, setLoginpage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [val , setVal] = useState('');
  const clas = useStyles1();
  const classes = useStyles();
  const cla = useStyles2();
  const cl = useStyles3();
  const c = useStyles0();
  const [name, setName] = useState('');
  const [data, setdata] = useState([]);
  const [docdata, setDocData] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(temp => {
      if(temp){
        db.collection('customers').doc(temp.uid).get().then(
          item => {
            if(item.exists){
              setuser({id: item.id, data: item.data()});
            }
          }
        )
      }
    })
    
    return unsubscribe;
  }, [])

  

  useEffect(() => {
    const nstates = csc.getStatesOfCountry("IN");
    const options = nstates.map((state) =>({
        'value': state.isoCode,
        'label': state.name
    }
    ))
    setStates(options);
    let cat = ['Wedding', 'Birthday', 'Anniversary', 'Bachelorette', 'Conference', 'Couples', 'Family', 'Fashion', 'Graduation', 'Honeymoon', 'Instagram', 'Kids', 'Maternity', 'Newborn', 'Product', 'Property', 'Solo_Traveler', 'Hair_Stylist', 'Folk', 'Drone'];
    const hello = cat.map(i => ({
      'value': i,
      'label': i
    }))
    setCategories(hello);
  }, [])
  
  const [fixed, setFixed] = useState([]);
  useEffect(() => {
    let arr = [];
    db.collection("photographers").get().then(
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arr.push({id: doc.id, data: doc.data()})
    
    })
    setFixed(arr);
    setDocData(arr);
  }
    
    )}, [])

  // useEffect(() => {
  //   setDocData(props.data);
  // })

  function cityForState(event){
    setSelectedState(event.label);
    const cities = csc.getCitiesOfState("IN", event.value);
    console.log(cities);
    const options = cities.map((cit) =>({
        'value': cit.stateCode,
        'label': cit.name
    }
    ))
    setCity(options);
  }

  function applyFilter(){
    let arr = [];
    let modifyarr = [];
    let anothermodify = [];
    if(val!==''){
      fixed.map(item => {
        if(item.data.categories[val]){
            arr.push(item);
          }
      })

      if(selectedState!==''){
        arr.map(item => {
          if(item.data.State===selectedState){
            modifyarr.push(item);
          }
        })
        if(selectedCity!==''){
          modifyarr.map(item => {
            if(item.data.City===selectedCity){
              anothermodify.push(item);
            }
          })
          setDocData(anothermodify);
        }
        else{
          setDocData(modifyarr);
        }
      }
      else{
        setDocData(arr);
      }
    }
    else{
      filterforState();

    }
  }

  function filterforState(){
    let arr = [];
    let modifyarr = [];
    fixed.map(item => {
      if(item.data.State===selectedState){
        arr.push(item)
      }
      });
      if(selectedCity!==''){
        arr.map(item => {
          if(item.data.City===selectedCity){
            modifyarr.push(item);
          }
        })
        setDocData(modifyarr);
      }
      else{
        setDocData(arr);
      }
  }

  function clear(){
    setDocData(fixed);
    setName('');
  }
  
  function search(){
    let arr = [];
    fixed.map(item => {
      if(item.data.Name.toLowerCase().search(name.toLowerCase())>=0){
          arr.push(item);
        }
    })
    setDocData(arr);
  }

  function logOut(){
    auth.signOut();
    window.location.reload();
  }

  if(!loginpage){
  return (
  <div>
    <div className={c.grow} style={{marginLeft: '-2vw'}}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Grapher-Mart
          </Typography>
          <div className={c.search} style={{marginLeft: '53vw'}}>
            
            <InputBase
              classes={{
                root: c.inputRoot,
                input: c.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setName(e.target.value)}
              value={name}
              placeholder='Search photographer'
            />
            <Button style={{color: 'white', height: '5vh'}} onClick={search}><div className={c.searchIcon}>
              <SearchIcon />
            </div></Button>
          </div>
          {user && Object.keys(user).length === 0 && user.constructor === Object ? 
          <Button variant='outlined' style={{color: 'white', backgroundColor: 'rgba(92, 107, 192, 1)'}} onClick={e => setLoginpage(true)}>Login</Button>
          :
          <p style={{color: 'white', backgroundColor: 'rgba(92, 107, 192, 1)', width: '7vw', overflow: 'hidden', textOverflow: 'ellipsis', paddingTop: '1vh', paddingBottom: '1vh', borderRadius: '4px', paddingLeft: '0.5vw', cursor: 'pointer', textAlign: 'center', paddingRight: '0.5vw'}} onClick={logOut}>{user.data.Name.split(" ", 1)}</p>
          }
          <div className={c.grow} />
        </Toolbar>
      </AppBar>
    </div>
  <div style={{display: 'flex'}}>
    <div style={{backgroundColor: 'white', marginTop: '3vh', height: '30vh', marginLeft: '-1vw', maxWidth: '18vw'}} className={cl.root}>
    
      <Grid container spacing={0.5}>
      <Grid item xs={12}>
          <Paper className={cl.paper}>
            <div style={{width: '15vw', display:'inline-block', marginLeft: '1vw', paddingTop: '2vh', paddingBottom: '2vh', marginRight: '1vw'}}>
            <Select options={categories} placeholder='Select Category' onChange={e => setVal(e.label)}/>
            </div>
            <div style={{width: '15vw', display:'inline-block', marginLeft: '1vw', paddingBottom: '2vh'}}>
            <Select options={states} placeholder='Select State' onChange={event => cityForState(event)}/>
            </div>
            <div style={{width: '15vw', display:'inline-block', marginLeft: '1vw'}}>
            <Select options={city} placeholder='Select City' onChange={event => setSelectedCity(event.label)} />
            </div>
            <div style={{width: '17vw', display:'inline-block', marginLeft: '2vw', verticalAlign: 'top', marginTop: '2vh'}}>
            <Button variant='contained' color='primary' onClick={applyFilter} style={{marginBottom: '1vw', display:'inline-block'}}>Filter</Button>
            <Button variant='contained' color='primary' onClick={clear} style={{marginBottom: '1vw', display:'inline-block', marginLeft: '1vw'}}>Clear</Button>
            </div>
            <br/>
          </Paper>
        </Grid>
      </Grid>
    </div>
    <div style={{marginRight: '2vw', marginLeft: '1vw'}} className={classes.root}>
      
      
        <Grid container spacing={0.5}>
        {   docdata.length?
            docdata.map(({id, data}) => (
                
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                <div style={{display: 'flex', justifyContent: 'left'}}>
            <div style={{marginTop: '1vw'}}>
                <Card className={clas.root}>
                <CardActionArea>
                    <CardMedia
                    className={clas.media}
                    image={data.profile.url!=='' ? data.profile.url : dpp}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.id}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.Name}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    
                    <Button size="small" color="primary">
                    <Link to={{pathname: '/about', state: {data, user, id}}}>About</Link>
                    </Button>
                </CardActions>
                
                </Card>
            
            </div>
            <div style={{display: 'block'}}>
              <div style={{marginTop:'1vh', marginLeft: '1vw', height: '5vh', width: '15vw'}}><h1>Sample Work</h1></div>
              <div style={{marginLeft: '1.2vw', marginTop: '3vh', width: '60vw', textAlign: 'left'}}>
                  <SingleLineGridList photos={data.photos.slice(0,3)}/>
              </div>
            </div>
             
        </div>
        </Paper></Grid>))
        : <Grid container spacing={0.5}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>No Such Photographer</Paper>
            </Grid>
          </Grid>
          }
          </Grid>
        
    </div>
  </div>
  </div>
  );}
  else{
    return(
      <div>
      <div className={c.grow} style={{marginLeft: '-2vw'}}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Grapher-Mart
          </Typography>
          {/* <div className={c.search} style={{marginLeft: '55vw'}}>
            
            <InputBase
              classes={{
                root: c.inputRoot,
                input: c.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setName(e.target.value)}
              value={name}
              placeholder='Search photographer'
            />
            <Button style={{color: 'white', height: '5vh'}} onClick={search}><div className={c.searchIcon}>
              <SearchIcon />
            </div></Button>
          </div> */}

          <Button variant='outlined' style={{color: 'white', backgroundColor: 'rgba(92, 107, 192, 1)', marginLeft: '80vw'}} onClick={e => setLoginpage(false)}>Back</Button>
          <div className={c.grow} />
        </Toolbar>
      </AppBar>
    </div>
        <Grid container spacing={0.5} style={{marginLeft: '30vw'}}>
          <Grid item xs={4}>
          <Paper className={classes.paper}><Photog_login /></Paper>
          </Grid>
        </Grid>
  </div>
    )
  }
}