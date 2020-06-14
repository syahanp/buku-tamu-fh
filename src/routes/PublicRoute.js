import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Route access if user DONT HAVE authorization
function PublicRoute({ component: Component, auth, ...rest }) {
  
  return(
    <Route 
      {...rest} 
      render={props => 
        !auth ?
        <Component {...props} /> :
        <Redirect to='/' />
      }
    />
  );
}

export default PublicRoute;