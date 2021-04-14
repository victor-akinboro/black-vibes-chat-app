import React, { useEffect } from 'react'
import './component-stylesheet/Login.css'
import { auth, provider, database } from '../Firebase/Firebase'
import {useStateValue} from '../state-management/StateProvider'

function Login() {
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscribe = database.collection('users').onSnapshot(snapshot => {
      const allFriends = snapshot.docs.map(friend => ({
        id: friend.id,
        ...friend.data()
      }));
      
    dispatch({
      type: "SET_FRIENDS",
      friends: allFriends
    })
    
    });
    return () => unsubscribe()
<<<<<<< HEAD
   }, [])
=======
   })

>>>>>>> 54c1294 (glassmorphism)

  const handleLogin = (e) => {
    auth.signInWithPopup(provider)
  .then((result) => {
    const user = result.user;

    // the details we need
    const neededDetails = {
      name: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      email: user.email
    }; 

    dispatch({
      type: "SET_USER",
      user: neededDetails
    })

    // checks if user already has an account

    const alreadyHasAnAccount = state.friends.some(friend => friend.email === user.email);
    if (alreadyHasAnAccount) {
      
    } else {
      database.collection('users').add(neededDetails)
    }
    
  }).catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage)
  });
  }

  return (
    <div className="login">
      <div className="login__container">
<<<<<<< HEAD
          <img src="/images/loginIcon.svg" alt=""/>
=======
          <div className="spin"></div>
>>>>>>> 54c1294 (glassmorphism)
          <button onClick={handleLogin}>Login with Google</button>
      </div>
    </div>
  )
}

export default Login
