import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useAuth0 } from '@auth0/auth0-react'

const Home: NextPage = () => {
  const { loginWithRedirect } = useAuth0()
  return (
    <div className={styles.container}>
      <h1>ConnectMour</h1>
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  )
}

export default Home
