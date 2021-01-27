import React from 'react';
// import './App.css';

import firebase from 'D:/KYH PLUGG/Folders/tradingview/src/firebase/config';
import user from "../../../node_modules/firebase"  // FIREBASE CONSOLEN
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';  // KANSKE ANVÄNDA AUTH IFRÅN REDAN IMPLEMENTERADE KODEN
import {useCollectionData} from 'react-firebase-hooks/firestore';  // KANSKE ANVÄNDA AUTH IFRÅN REDAN IMPLEMENTERADE KODEN

import SignIn from "D:/KYH PLUGG/Folders/tradingview/src/components/pages/SignIn";
import { signout } from 'D:/KYH PLUGG/Folders/tradingview/src/store/actions/authActions';

import {ChatMessageProps, Message} from './types';

// firebase.initializeApp({
//   apiKey: "AIzaSyDn7t2fWO7jTqc-PxvSTAgai_U7bzShERc",
//   authDomain: "chat-app-1b4f3.firebaseapp.com",
//   databaseURL: "https://chat-app-1b4f3.firebaseio.com",
//   projectId: "chat-app-1b4f3",
//   storageBucket: "chat-app-1b4f3.appspot.com",
//   messagingSenderId: "2192122424",
//   appId: "1:2192122424:web:262325b5366bcf086c7ccd",
//   measurementId: "G-KJTC4JJQXJ"
// })

const auth = firebase.auth()
const firestore = firebase.firestore()

// function SignIn(){
//   const signInWithGoogle = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider)
//   }
//   return <button onClick={signInWithGoogle}>Sign in with Google</button>
// }

// function SignOut(){
//   return auth.currentUser && (
//     <button onClick={() => auth.signOut()}>Sign Out</button>
//   )
// }

function ChatMessage(props : ChatMessageProps){
  const {text, uid, photoURL} = props.message
  const messageClass = auth.currentUser != null && uid === auth.currentUser.uid ? 'sent' : 'received'
  return <div className={`message ${messageClass}`}>
      <img src={photoURL}/>
      <p>{text}</p>
    </div>
}

function ChatRoom(){
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] : [Message[] | undefined, boolean, Error | undefined] = useCollectionData<Message>(query, {idField: 'id'})

  const [formValue, setFormValue] = React.useState('')

  const dummy = React.useRef<HTMLDivElement>(null)

  const sendMessage = async(e : React.FormEvent) =>{
    e.preventDefault()
    const user = auth && auth.currentUser && auth.currentUser;

    const uid = user && user.uid
    const photoURL = user && user.photoURL

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')
    dummy.current && dummy.current.scrollIntoView({behavior: 'smooth'})
  }

  return(
    <>
      <main>
        {
          messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)
        }
        <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={e => setFormValue(e.target.value)}
          />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat App</h1>
      </header>
      <section>
        <ChatRoom/>
      </section>
    </div>
  );
}

export default App;