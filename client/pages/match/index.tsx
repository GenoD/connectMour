import { useCallback, useEffect, useState, useContext } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { io, Socket } from 'socket.io-client'

import PlayerContext from '../../context/PlayerContext'
import Column from './column'
import * as BoardInterfaces from './board_interfaces'
import { useAuth0 } from '@auth0/auth0-react'

const DEFAULT_NUM_COLUMNS = 7
const DEFAULT_NUM_ROWS = 7
const INITIAL_BOARD_STATE: BoardInterfaces.State = {
  player: 1,
  boardState: Array.from({ length: DEFAULT_NUM_COLUMNS }, (val, index) => {
    return {
      columnId: index,
      column: Array.from({ length: DEFAULT_NUM_ROWS }, (val, index) => {
        return {
          id: index,
          value: 0,
        }
      }),
    }
  }),
}

const Home: NextPage = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0<{
    picture: string
    name: string
    email: string
    sub: string
  }>()
  console.log('auth0', {
    user,
    isAuthenticated,
    isLoading,
  })
  const playerInfo = useContext(PlayerContext)
  const [board, setBoard] = useState(INITIAL_BOARD_STATE)
  const [response, setResponse] = useState()
  const [socket, setSocket] = useState<Socket | undefined>()
  const { boardState, player } = board

  const handlePlayerMove = useCallback(
    (columnNum: number, player: 1 | 2): void => {
      // setBoardState
      const nextOpenSpace = boardState[columnNum].column.map((val) => val.value).indexOf(0)
      if (nextOpenSpace === -1) return

      let newState = { ...board }
      newState.boardState[columnNum].column[nextOpenSpace].value = player
      newState.player = player === 1 ? 2 : 1
      setBoard(newState)

      socket?.emit('playerMove', { test: 'value here ' })
    },
    [board, boardState, socket],
  )
  // Send board state to server
  useEffect(() => {}, [board])
  // TODO determine how to type the destructure of useReducer

  useEffect(() => {
    console.log('MOUNTING!')
    const socket = io('http://localhost:5000', {
      query: {
        userId: user?.sub,
      },
    })
    setSocket(socket)
    socket.on('FromAPI', (data) => {
      setResponse(data)
    })
    console.log('Connection established via', socket)
  }, [user?.sub])

  return (
    <div className="p-8">
      <h1 className="font-bold">ConnectMour Match Page</h1>
      {response && <h2 className="font-bold">{response}</h2>}
      {isAuthenticated && user && (
        <div>
          <Image width={50} height={50} src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
      <div className="flex">
        {boardState.map((val) => {
          const { columnId, column } = val
          return (
            <Column
              key={columnId}
              columnNum={columnId}
              columnState={column}
              player={player}
              handlePlayerMove={handlePlayerMove}
            />
          )
        })}
      </div>
      <button onClick={() => logout({ returnTo: 'http://localhost:3000' })}>Log Out</button>
    </div>
  )
}

export default Home
