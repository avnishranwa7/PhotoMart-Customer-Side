import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper} from '@material-ui/core';
import dpp from '../../dpp1.jpg';
import './About.css';
import Chat from '../Chat/Chat';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const modalStyles = makeStyles((theme) => ({
    modal: {
      display: 'block',
      alignItems: 'center',
      justifyContent: 'center',
      overflowY: 'scroll',
      position: 'absolute',
      height: '75%',
      width: '35%',
      marginLeft: '32vw',
      marginTop: '15vh',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
    //   padding: theme.spacing(2, 4, 3),
    
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

export default function About(props) {
    const [open, setOpen] = React.useState(false);
    const [chat, setchat] = useState(false);
    window.scrollTo(0,0);
    let data = props.location.state.data;
    let user = props.location.state.user;
    let pid = props.location.state.id;
    const classes = useStyles();
    const style = modalStyles();
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    if(chat){
        return(
            <div>
                <div className={classes.grow} style={{marginLeft: '-2vw'}}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Grapher-Mart
          </Typography>
          <Button variant='outlined' style={{color: 'white', backgroundColor: 'rgba(92, 107, 192, 1)', marginLeft: '81vw'}} onClick={e => setchat(false)}>Back</Button>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      {/* <MediaCard data={data}/> */}
    </div>
                <Grid container spacing={0.5} style={{marginLeft: '27vw'}}>
                    <Grid item xs={5}>
                        <Paper className={classes.paper} style={{minHeight: '75vh'}}><Chat pid={pid} user={user}/></Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
    return (
        <div>
            <div className={classes.grow} style={{marginLeft: '-2vw'}}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Grapher-Mart
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      {/* <MediaCard data={data}/> */}
    </div>
        
        <div style={{marginRight: '2vw'}}>
            
            <Grid container spacing={0.5}>
                <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <div className={classes.root}>
                                <div style={{textAlign: "left"}}>
                                    {/* DP Image */}
                                    <div className="DP">
                                        <img src={data.profile.url !== "" ? data.profile.url : dpp} alt="Loading..." height='180vh' width='200vw' style={{borderRadius: '50%'}} />
                                        {/* <Avatar alt="Remy Sharp" src={data.profile} sizes="large" /> */}
                                        
                                    
                        
                                    {/* Name, email, no., city, & state */}
                                    <div className="personal__info">
                                        <h1>{data.Name}</h1>
                                        <p>{data.Email}</p>
                                        <p>{data.No}</p>
                                        <p>{data.City}, {data.State}</p>
                                    </div>
                                    <div style={{ display: 'inline', marginLeft: '48vw', verticalAlign: 'top' }} >
                                        <Button color='primary' variant='contained' onClick={e => setchat(true)}> Chat </Button>
                                    </div>

                                </div>
                        
                                    {/* Categories */}
                                    <div className="name"><h2>Categories Selected: </h2></div>
                                    <div className="categories">
                                            {
                                                Object.entries(data.categories).map(([key, value]) => {
                                                    if (value){
                                                        return (
                                                            <div className="buttons">
                                                                <Button variant='outlinedPrimary'>{key}</Button>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                    </div>
                                    
                                    <div className="separator">
                                        Your Photos
                                    </div>
                        
                                    <br/>
                        
                                    <div>
                                        {data.photos.map((tile) => (
                                            <a href={tile.url} target="_blank"><img src={tile.url} alt="nhi chal rha" height='200vh' width='280vw' className='photo' /></a>
                                        ))}
                                    </div>
                        
                                </div>
                            </div>
                        </Paper>
                    </Grid>
            </Grid>
        </div>
    </div>
    )
}
