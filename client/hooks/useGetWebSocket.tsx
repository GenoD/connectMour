import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { AuthenticatedUser } from 'types'

const useGetWebSocket = (user: AuthenticatedUser | undefined): [Socket | null] => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    if (user) {
      console.log('MOUNTING!')
      const newSocket = io('http://localhost:5000', {
        query: {
          userId: user?.sub,
        },
      })
      setSocket(newSocket)
      console.log('Connection established via', newSocket)
    }
  }, [user, user?.sub])

  return [socket]
}

export default useGetWebSocket
