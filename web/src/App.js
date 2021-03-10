import React from 'react';

import { store } from './redux/store';
import { Provider } from 'react-redux';

import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import theme from './themes';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Routes />
        </Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
