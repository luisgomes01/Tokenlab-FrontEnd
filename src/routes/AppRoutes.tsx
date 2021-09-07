import React from 'react'

import {Route} from 'react-router-dom';

import { CalendarScreen } from '../pages/CalendarScreen';

const AppRoutes: React.FC = () => {
  return (
    <Route path="/" exact component={CalendarScreen}/>
  )
}

export default AppRoutes