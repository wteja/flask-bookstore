import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Auth0Provider } from '@auth0/auth0-react';
import type { AppProps } from 'next/app'
import AccessControl from '../src/auth/AccessControl';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string}
      audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE as string}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI as string}>
      <AccessControl>
        <Component {...pageProps} />
      </AccessControl>
    </Auth0Provider>
  )
}

export default MyApp
