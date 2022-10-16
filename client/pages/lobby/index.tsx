import { NextPage } from 'next'
import { useCallback, useContext } from 'react'
import { PlayerContext } from 'context/PlayerContext'

const Lobby: NextPage = () => {
  const { socket } = useContext(PlayerContext)

  const joinMatchQueue = useCallback(() => {
    socket?.emit('queueForMatch')
  }, [socket])
  return (
    <div>
      <h1 className="font-bold">Welcome to the Lobby</h1>

      <button onClick={joinMatchQueue}>Hop in Queue!!!</button>
    </div>
  )
}

export default Lobby
