import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { auth, provider, signInWithRedirect } from '../config';

import About from './About';

export default function Home() {
  const navigate = useNavigate()

  const handleSignIn = (event) => {
    event.preventDefault()
    console.log('signing in')
    signInWithRedirect(auth, provider)
    // navigate to a route
    navigate('/items')
  }

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
