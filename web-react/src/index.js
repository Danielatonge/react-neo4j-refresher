import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider, createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { setContext } from '@apollo/client/link/context';

const AppWithApollo = () => {
  const [accessToken, setAccessToken] = useState()
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0()

  const getAccessToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently()
      console.log(token)
      setAccessToken(token)
    } catch (err) {
      // loginWithRedirect()
    }
  }, [getAccessTokenSilently, loginWithRedirect])

  useEffect(() => {
    getAccessToken()
  }, [getAccessToken])

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = accessToken
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}


const Main = () => (
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENTID}
    redirectUri={window.location.origin}
    audience='https://dev-7so-sx2z.us.auth0.com/api/v2/'
  >
    <AppWithApollo />
  </Auth0Provider>
)

ReactDOM.render(<Main />, document.getElementById('root'))
registerServiceWorker()
