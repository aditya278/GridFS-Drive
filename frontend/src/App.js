import React from 'react'
import routes from './routing/routes';
import { useRoutes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

//Redux
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
  const routing = useRoutes(routes);
  return (
    <Provider store={store}>
      <SnackbarProvider>
        { routing }
      </SnackbarProvider>
    </Provider>
  )
}