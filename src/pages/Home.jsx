import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import {
  auth, getRedirectResult, onAuthStateChanged, provider,
  signInWithRedirect, signOut
} from '../config';

import About from './About';

export default function Home() {
  // state
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    console.log('signing in');
    await signInWithRedirect(auth, provider);
    // navigate to a route
    // navigate('/items')
  };

  // get the result of the redirect
  useEffect(() => {
    // first
    async function getRedirect() {
      try {
        const result = await getRedirectResult(auth);

        if (result) {
          console.log('Signin Successful', result.user);
          setUser({...result.user})
          setIsAuth(true);

        }
      } catch (error) {
        console.log(error.message);
        // throw a toast or useErrorBoundary to handle our error
      }
    }

    getRedirect();
  }, []);

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          console.log(user);
          setUser({ ...user });
          setIsAuth(true);
          // navigate('/items');
        }

      },
      (error) => {
        console.log(error);
      },
      (complete) => {
        console.log(complete)
      }
    );
  }, []);

  return (
    <div id="home">
      <h1>Home</h1>
      <HashLink
        to="#about"
        smooth
        scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}
      >
        About Inside Home
      </HashLink>
      <br />
      {isAuth ? (
        <button
          onClick={(e) => {
            e.preventDefault();

            signOut(auth)
              .then(() => {
                navigate('/');
                setIsAuth(false)
                // redirect('/');
              })
              .catch((err) => {
                console.log(err.message);
              });
          }}
        >
          Log Out
        </button>
      ) : (
        <button onClick={handleSignIn}>Sign In With Google</button>
      )}

      {isAuth && <section style={{ marginBottom: '500px' }}>
        The rest is history, we have entered world class
        <p>{ user.displayName}</p>
        <p>{user.email}</p>
        <img src={user.photoURL} alt='loggedin user image' />
      </section>}
      <About isHome />
    </div>
  );
}
