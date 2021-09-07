import React, {useEffect, useState} from 'react';

import AppRoutes from './AppRoutes'
import AuthRoutes from './AuthRoutes'

const Routes: React.FC = () => {
  const [isLogged , setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(!!localStorage.getItem('user_id'))
  }, [])
  
  return (isLogged ? <AppRoutes /> : <AuthRoutes />)
}

export default Routes