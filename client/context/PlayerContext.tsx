import React from 'react'
import { Socket } from 'socket.io-client'
import { useAuth0 } from '@auth0/auth0-react'
import useGetWebSocket from '../hooks/useGetWebSocket'
import { AuthenticatedUser } from 'types'

interface Props {
  children: React.ReactNode
}

interface PlayerContextInterface {
  socket: Socket | null
}

export const PlayerContext = React.createContext<PlayerContextInterface>({
  // userId: Math.floor(Math.random() * 10000),
  socket: null,
})

const PlayerContextProvider: React.FC<Props> = (props) => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0<AuthenticatedUser>()

  console.log('user info here dough', { user })
  const [socket] = useGetWebSocket(user)
  console.log('Socket info in app', { socket, user })
  return (
    <PlayerContext.Provider
      value={{
        socket,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider
