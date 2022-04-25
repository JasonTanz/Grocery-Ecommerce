import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { theme } from '@chakra-ui/react';
import store from './store';
import { API_URL } from './constants';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from '@mui/material/styles';
const MUITheme = unstable_createMuiStrictModeTheme();
const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ThemeProvider theme={MUITheme}>
        <ChakraProvider theme={theme}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ChakraProvider>
      </ThemeProvider>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
