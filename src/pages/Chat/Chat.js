import React, {useState, useEffect, forwardRef, useRef} from 'react';
import { Button, Input, Card, CardContent, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import './Chat.css';
import db from '../../firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

const Message = forwardRef(({message, photog}, ref) => {
    return (
        <div className="messageCard" ref={ref}>
            <Card className={photog ? "userCard" : "couserCard"}>
                <CardContent>
                    <Typography color="white" variant="outlined" component="h4">
                        {/* The below line makes the user's own texts appear without a username */}
                    {message.message}
                    </Typography>
                    {/* <Typography color="white" variant="caption" style={{marginTop: '-6vh'}}>
                    {message.timestamp.toDate().getHours()}
                    </Typography> */}
                </CardContent>
            </Card>
        </div>
    )
})


export default function Chat(props) {
    const [type, settype] = useState('');
    const [chat, setchat] = useState([]);
    let pid = props.pid;
    let user = props.user;
    useEffect(() => {
        
        // db.collection("messages").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        //     setMessages(snapshot.docs.map(doc => (
        //       ({id: doc.id, message: doc.data()})
        //     )))
        //   });
      
        db.collection('messages').doc(pid.slice(0,10)+user.id.slice(0,10)).collection('chat').orderBy('timestamp').onSnapshot(
            snapshot =>{
            setchat(snapshot.docs.map(doc => (
                ({id: doc.id, message: doc.data()})
            )))
            }
        )
    }, [])

    function sendMessage(){
        console.log(pid.slice(0,10)+user.id.slice(0,10));
        db.collection('messages').doc(pid.slice(0,10)+user.id.slice(0,10)).collection('chat').add(
            {message: type, photog: false, timestamp: firebase.firestore.FieldValue.serverTimestamp()}
        )
        settype('');
    }

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    return (
        <div>
            <div className='messages'>
            <FlipMove className="message">
                {chat.map(({id, message}) => (
                    <div align={!message.photog ? "right" : "left"}>
                    <Message message={message} photog={message.photog} key={id} />
                    <AlwaysScrollToBottom />
                    </div>
                ))}
            </FlipMove>
            </div>
            <div className='send'>
                <Input placeholder='Type your message' style={{width: '31vw'}} onChange={e => settype(e.target.value)} value={type}></Input>
                <Button style={{marginLeft: '0.7vw'}} onClick={sendMessage}><SendIcon style={{color: 'blue'}} disabled={!type}/></Button>
            </div>
        </div>
    );
}
