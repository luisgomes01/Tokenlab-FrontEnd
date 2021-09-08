import React from 'react'

import {Route} from 'react-router-dom';
import CalendarContextProvider from '../contexts/Calendar';

import { CalendarScreen } from '../pages/CalendarScreen';

const AppRoutes: React.FC = () => {
  return (
    <CalendarContextProvider>
      <Route path="/" exact component={CalendarScreen}/>
    </CalendarContextProvider>
  )
}

export default AppRoutes;