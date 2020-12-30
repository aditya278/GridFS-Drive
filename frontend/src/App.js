import React from 'react'
import routes from './routing/routes';
import { useRoutes } from 'react-router-dom';

export default function App() {
  const routing = useRoutes(routes);
  return (
    <div>
      {
        routing
      }
    </div>
  )
}