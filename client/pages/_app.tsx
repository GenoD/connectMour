import '../styles/globals.css'
import type { AppProps } from 'next/app'
import PlayerContext from '../context/PlayerContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayerContext.Provider
      value={{
        userId: Math.floor(Math.random() * 10000),
      }}
    >
      <Component {...pageProps} />
    </PlayerContext.Provider>
  )
}

export default MyApp
