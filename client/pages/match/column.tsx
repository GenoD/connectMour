import { useState } from 'react'

const DefaultRows = 10;

interface Props {
}

const Column: React.FC<Props> = () => {
  const [columnState, setColumnState] = useState<(string)[] | []>(Array.from({ length: DefaultRows }))
  const [nextOpenSpace, setNextOpenSpace] = useState<number>(0);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log('clicked')
    e.stopPropagation();
    if (nextOpenSpace === 10) return;

    let newColumnState = [...columnState];
    newColumnState[nextOpenSpace] = 'red'
    setColumnState(newColumnState)
    setNextOpenSpace(nextOpenSpace + 1)
  };
  return (
    <div className='flex flex-col-reverse'>
      {
        columnState.map((val, index) => {
          return (
            <div
              key={index}
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                handleClick(e)
              }}
              className={`m-[2px] w-[50px] h-[50px] rounded-full ${columnState[index] === 'red' ? 'bg-red-500' : 'bg-gray-300'}`}
            />
          )
        })
      }
    </div>
  )
}

export default Column