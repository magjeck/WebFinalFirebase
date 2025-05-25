import { useState, useEffect } from 'react'
import './App.css'

import {db, auth, google} from '../firebase.ts';
import { doc, updateDoc, deleteDoc, getDoc, setDoc} from "firebase/firestore";
import { signInWithPopup, signOut } from 'firebase/auth';

function App() {
  const colors = ['#22FF39', '#FF0032', '#843B62', '#6BD977', '#FF6B6B', '#000000'];
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [docRef, setDocRef] = useState(null);

  const handleClick = () => {
    if (index === colors.length - 1)
    {
      setIndex(0);
    }
    else
    {
      setIndex(index + 1);
    }

    setCount(count+1);
  };

  // const testDocRef = doc(db, "test", "single-document");

  const userID = auth.currentUser;
  
  useEffect(() => {
    if(!user) return;

    const userDocRef = doc(db, "test", userID.email); // the email will differentiate between all users

    const loadDocument = async () => {
      try {
        // if "single-document" does exist, then set to that (READ)
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setCount(docSnap.data().count || 0);
          setIndex(docSnap.data().index || 0);
          setDocRef(userDocRef);
        } else {
          // Because "single-document" was not created yet (ADD)
          await setDoc(userDocRef, { count: 0, index: 0, createdAt: new Date() }); //What will be written inside document "single-document"
          setCount(0);
          setIndex(0);
          setDocRef(userDocRef);
        }
      } catch (error) {
        console.error("Error loading document:", error);
      }
    };

    loadDocument();
  }, [user]);

  // Signing in with Google
  const handleAuthClick = async () => {
    if (user) {
      signOut(auth).catch(console.error);
      setUser(null);
      // Reset the page
      setDocRef(null);
      setCount(0);
      setIndex(0);
    } else {
      signInWithPopup(auth, google)
      .then((result) => setUser(result.user))
      .catch(console.error);
    }
  };

  // (DELETE)
  const handleDelete = async () => {
    await deleteDoc(docRef);
    signOut(auth).catch(console.error);
    setUser(null);
    // Reset the page
    setDocRef(null);
    setCount(0);
    setIndex(0);
  };

  // (UPDATE)
  useEffect(() => {
      if (!docRef) return;
      const updateCount = async () => {
        try {
          await updateDoc(docRef, { count, index });
        } catch (error) {
          console.error("Error updating count:", error);
        }
      };
      updateCount();
    }, [docRef, count]);

  return (
    <div className="buttonScreen" style={{backgroundColor: colors[index], height: '100vh', width: '100vw'}}>
      <p className="countDisplay"> Count: {count} </p>
      <button className="signInButton" onClick={handleAuthClick}> {user ? "Sign Out" : "Sign In"} </button>
      <button className="colorButton" disabled={!user} onClick={handleClick}> Change Background Color </button>
      <button className="deleteButton" disabled={!user} onClick={handleDelete}> Delete Account </button>
    </div>
  );
};

export default App