export interface BoardSpace {
  id: number
  value: 0 | 1 | 2
}

export interface ColumnState {
  columnId: number
  column: BoardSpace[]
}

export interface State {
  player: 1 | 2
  boardState: ColumnState[]
}

export interface Action {
  payload: {
    player: 1 | 2
    columnNum: number
    nextOpenSpace: number
  }
}
