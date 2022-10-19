import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { auth, getRedirectResult, onAuthStateChanged, provider, signInWithRedirect } from '../config';

import About from './About';

export default function Home() {
  // state
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate()

  const handleSignIn = async (event) => {
    event.preventDefault()
    console.log('signing in')
    await signInWithRedirect(auth, provider)
    // navigate to a route
    // navigate('/items')
  }

  // get the result of the redirect
  useEffect( () => {
    // first
    async function getRedirect() {
      try {
        const result = await getRedirectResult(auth)

        if (result) {
          console.log('Signin Successful', result.user);
          setIsAuth(true);
          navigate('/items')
        }

      } catch (error) {
        console.log(error.message)
        //
      }
    }

    getRedirect()
  }, [])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
    }, (error) => {
      console.log(error)
    })

  }, [])



  return (
    <div id="home">
      <h1>Home</h1>
      <HashLink
        to="#about"
        smooth
        scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}
      >
        About Inside Home
      </HashLink><br />
      <button onClick={handleSignIn }>Sign In With Google</button>
      <section style={{ marginBottom: '500px' }}>
        The rest is history, we have entered world class
      </section>
      <About isHome />
    </div>
  );
}
