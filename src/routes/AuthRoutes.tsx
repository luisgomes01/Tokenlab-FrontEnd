import React from 'react';
import {Route} from 'react-router-dom';

import LoginScreen from '../pages/LoginScreen';
import Registration from '../pages/Registration';

const AuthRoutes: React.FC = () => {
  return (
      <>  
        <Route path="/" exact component={LoginScreen} />
        <Route path="/registration" exact component={Registration}/>
      </>
  )
};


export default AuthRoutes;
