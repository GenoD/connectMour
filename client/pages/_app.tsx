import '../styles/globals.css'
import { Auth0Provider } from '@auth0/auth0-react'
import type { AppProps } from 'next/app'
import PlayerContext from '../context/PlayerContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain="dev-ujjm7533.us.auth0.com"
      clientId="MKzxSndWAeMJrQXuEXYxpNEPxdPJRhr5"
      redirectUri={'http://localhost:3000/match'}
    >
      <PlayerContext.Provider
        value={{
          userId: Math.floor(Math.random() * 10000),
        }}
      >
        <Component {...pageProps} />
      </PlayerContext.Provider>
    </Auth0Provider>
  )
}

export default MyApp
