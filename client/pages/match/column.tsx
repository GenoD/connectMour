import * as BoardInterfaces from './board_interfaces'

interface Props {
  columnNum: number,
  columnState: BoardInterfaces.BoardSpace[]
  player: 1 | 2,
  handlePlayerMove: (columnNum: number, player: 1 | 2) => void;
}

const handleColor = (value: 0 | 1 | 2) => {
  switch(value) {
    case 1:
      return 'bg-red-500'
    case 2:
      return 'bg-yellow-300'
    default:
      return 'bg-gray-300'
  }
}

const Column: React.FC<Props> = ({ columnNum, columnState, player, handlePlayerMove }) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    // const nextOpenSpace = columnState.map(val => val.value).indexOf(0)
    // Prevent turn
    // if (nextOpenSpace === -1) return

    handlePlayerMove(columnNum, player)
  };

  return (
    <div className='flex flex-col-reverse'>
      {
        columnState.map(({ id, value }) => {
          return (
            <div
              key={id}
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                handleClick(e)
              }}
              className={`m-[2px] w-[50px] h-[50px] rounded-full ${handleColor(value)}`}
            />
          )
        })
      }
    </div>
  )
}

export default Column