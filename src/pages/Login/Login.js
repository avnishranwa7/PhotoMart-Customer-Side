import React, {useRef, useState, useEffect} from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './Login.css';
import db, {auth} from '../../firebase';
import firebase from "firebase";


export default function Photog_login() {
    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [conf, setConf] = useState("")
    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");

    const emailRef = useRef(null);
    const passRef = useRef(null);

    function handleLogin(event){
        event.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passRef.current.value
        ).then(user => {
            var uid = user.user.X.X;
            db.collection('customers').doc(uid).get().then(doc => {
                if (doc.exists){
                        window.location.reload();
                }else{
                    setError1("Invalid credentials");
                }
            });
        }).catch(error => {
            setError1("Invalid credentials");
        })
    }

    function handleSignup(event){
        event.preventDefault();
        console.log(emailRef.current.value, conf, pass);

        let uid = "";

        if (pass === "" || conf === "" || name === "" || email === ""){
            setError2("Please fill the form completely");
            return;
        }

        if (!email.includes("@")){
            setError2("Please enter a proper email");
            return;
        }

        if (pass === conf){
            auth.createUserWithEmailAndPassword(
                emailRef.current.value,
                passRef.current.value
            ).then(_user => {
                console.log("chomu");
                console.log(_user);
                uid = _user.user.X.X;
                db.collection('customers').doc(uid).set({
                    Name: name,
                    Email: email,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(
                    () => window.location.reload(),
                    (error) => setError2(error.message)
                );
            }).catch(error => {
                setError2(error.message);
            })

        }else{
            setError2("Password doesn't match!");
        }
    }
    
    if (login === 1){ // Signup form
        return (
            <div className='login__form'>
                <br/><br/>
                <Button color='primary' variant='contained' onClick={event => setLogin(0)}> Login </Button>
                <Button color='primary' id='signup' variant='contained' onClick={event => setLogin(1)}> Signup </Button>
                <br/><br/>

                { error2 && <h3 style={{color: '#ff0033'}}> { error2 } </h3> }

                <FormControl fullWidth="true">
                <InputLabel>Full Name</InputLabel>
                <Input fullWidth="true" value={name} onChange={event => setName(event.target.value)}/>
                </FormControl>
                <br/><br/>

                <FormControl fullWidth="true">
                <InputLabel>Email</InputLabel>
                <Input fullWidth="true" value={email} inputRef={emailRef} onChange={event => setEmail(event.target.value)}/>
                </FormControl>
                <br/><br/>

                <FormControl fullWidth="true">
                <InputLabel>Password (at least 6 characters) </InputLabel>
                <Input fullWidth="true" type='password' inputRef={passRef} value={pass} onChange={event => setPass(event.target.value)}/>
                </FormControl>
                <br/><br/>

                <FormControl fullWidth="true">
                <InputLabel> Confirm Password </InputLabel>
                <Input fullWidth="true" type='password' inputRef={passRef} value={conf} onChange={event => setConf(event.target.value)}/>
                </FormControl>
                <br/><br/>

                <Button type="Submit" onClick={handleSignup} variant='outlinedPrimary'>Submit</Button>
                <p></p>
            </div>
        )
    }else{
        return (
            <div className='login__form'>
                <br/><br/>
                <Button color='primary' variant='contained' onClick={event => setLogin(0)}> Login </Button>
                <Button color='primary' id='signup' variant='contained' onClick={event => setLogin(1)}> Signup </Button>
                <br/><br/>
                { error1 && <h3 style={{color: '#ff0033'}}> { error1 } </h3> }
                {/* <h3 style={{color: '#ff0033'}}> Error: Me nhi chalunga! </h3> */}
                <FormControl fullWidth="true">
                <InputLabel>Email</InputLabel>
                <Input fullWidth="true" inputRef={emailRef}/>
                </FormControl>
                <br/> <br/>
                <FormControl fullWidth="true">
                    <InputLabel>Password (at least 6 characters)</InputLabel>
                    <Input fullWidth="true" type="password" inputRef={passRef}/>
                </FormControl>
                <br/> <br/>
                <Button type='submit' onClick={handleLogin} variant='outlinedPrimary'> Submit </Button>
                <br/><br/>
                <Button color='primary' variant='contained' href='/'> Back </Button>
            </div>
        )
    }
}