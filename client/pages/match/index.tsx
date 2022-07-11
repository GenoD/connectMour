import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { io } from "socket.io-client";
import Column from './column'

const DEFAULT_NUM_COLUMNS = 12

const Home: NextPage = () => {
  useEffect(() => {
    console.log('MOUNTING!')
    const socket = io('http://localhost:5000')
    console.log('Connection established via', socket)
  }, [])
  return (
    <div className="p-8">
      <h1 className="font-bold">ConnectMour Match Page</h1>
      <div className="flex">
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
      </div>
    </div>
  )
}

export default Home
