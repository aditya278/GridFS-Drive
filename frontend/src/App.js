import React, { useEffect } from 'react'
import routes from './routing/routes';
import { useRoutes } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken';

export default function App() {
  const routing = useRoutes(routes);
  
  useEffect(() => {
    if(localStorage.getItem('jwtToken')) {
      setAuthToken(localStorage.getItem('jwtToken'));
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
        { routing }
    </Provider>
  )
}