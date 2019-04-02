import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Channel from './Channel';
import { firebase, db } from './firebase';
import { Router, Redirect } from '@reach/router';

function App() {
  const user = useAuth();

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Router>
        <Channel path="channel/:channelId" user={user} />
        <Redirect from="/" to="/channel/general" />
      </Router>
    </div>
  ) : (
    <Login />
  );
}

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid
        };
        setUser(user);
        db.collection('users')
          .doc(user.uid)
          .set(user, { merge: true });
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
}

function Login() {
  const [authErr, setAuthErr] = useState(null);
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (err) {
      setAuthErr(err);
    }
  };
  return (
    <div className="Login">
      <h1>Chat App</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
      {authErr && (
        <div>
          <p>Sorry, there was a problem</p>
          <p>
            <i>{authErr.message}</i>
          </p>
          <p>Please try again</p>
        </div>
      )}
    </div>
  );
}

export default App;
