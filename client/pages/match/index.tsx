import { useEffect } from 'react'
import type { NextPage } from 'next'
import { io } from "socket.io-client";
import styles from '../../styles/Home.module.css'


const Home: NextPage = () => {
  useEffect(() => {
    console.log('MOUNTING!')
    const socket = io('http://localhost:5000')
    console.log('Connection established via', socket)
  }, [])
  return (
    <div className={styles.container}>
      <h1>ConnectMour Match Page</h1>
    </div>
  )
}

export default Home
