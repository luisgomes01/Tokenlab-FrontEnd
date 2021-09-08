interface ICalendarCell {
  date: string;
  events: EventAgenda[];
}

interface ICalendar {
  id: number;
  name: string;
  color: string;
}

interface CalendarContext {
  events: EventAgenda[];
  setEvents: (events: EventAgenda[]) => void;
  addNewEvent: (event: EventAgenda) => void;
  removeEvent: (event: EventAgenda) => void;
  editEvent: (event: EventAgenda) => void;
}