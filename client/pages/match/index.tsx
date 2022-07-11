import { Reducer, useEffect, useReducer } from 'react'
import type { NextPage } from 'next'
import { io } from "socket.io-client";
import Column from './column'
import * as BoardInterfaces from './board_interfaces'

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
      })
    }
  })
}

const reducer:Reducer<BoardInterfaces.State, BoardInterfaces.Action> = (state: BoardInterfaces.State, action: BoardInterfaces.Action) => {
  const newState = { ...state }
  const { columnNum, player, nextOpenSpace } = action.payload
  newState.boardState[columnNum].column[nextOpenSpace].value = player
  newState.player = player === 1 ? 2 : 1
  return newState
}

const Home: NextPage = () => {
  const [board, dispatch] = useReducer(reducer, INITIAL_BOARD_STATE)
  // TODO determine how to type the destructure of useReducer
  const { boardState, player } = board 
  useEffect(() => {
    console.log('MOUNTING!')
    const socket = io('http://localhost:5000')
    console.log('Connection established via', socket)
  }, [])

  return (
    <div className="p-8">
      <h1 className="font-bold">ConnectMour Match Page</h1>
      <div className="flex">
        {
          boardState.map((val) => {
            const { columnId, column } = val
            return <Column key={columnId} columnNum={columnId} columnState={column} player={player} dispatch={dispatch} />
          })
        }
      </div>
    </div>
  )
}

export default Home
