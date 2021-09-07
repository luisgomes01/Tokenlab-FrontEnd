import React, { createContext, useState, useContext } from 'react';



const  CalendarContext = createContext({} as CalendarContext)


export const useCalendarConext = () => useContext(CalendarContext)


const CalendarContextProvider: React.FC = ({children}) => {
  const [events, setEvents] = useState<EventAgenda[]>([] as EventAgenda[]);
    
  const addNewEvent = (event: EventAgenda) => {
    setEvents([...events, event])
  }

  const removeEvent = (eventId: number) => {
    setEvents(events.filter(event=>event.id!==eventId))
  }

  const editEvent = (event: EventAgenda) => {
    setEvents(events.map(e => e.id === event.id? event: e))
  }

  return (
    <CalendarContext.Provider value={{
        events,
        setEvents,
        addNewEvent,
        removeEvent,
        editEvent,
      }}>
      {children}
    </CalendarContext.Provider>
  )
}

export default CalendarContextProvider;



