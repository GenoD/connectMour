import '../styles/globals.css'
import { Auth0Provider } from '@auth0/auth0-react'
import type { AppProps } from 'next/app'
import PlayerContext from '../context/PlayerContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain="dev-ujjm7533.us.auth0.com"
      clientId="MKzxSndWAeMJrQXuEXYxpNEPxdPJRhr5"
      redirectUri={'http://localhost:3000/lobby'}
    >
      <PlayerContext>
        <Component {...pageProps} />
      </PlayerContext>
    </Auth0Provider>
  )
}

export default MyApp
