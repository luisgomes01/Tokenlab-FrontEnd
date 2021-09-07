import {format, isSameDay} from 'date-fns'
export const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

export function formatDate(date: Date): string {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1 ),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export function getToday() {
  return format(new Date(Date.now()), "yyyy-MM-dd");
}

export function generateCalendar(date: string, allEvents: EventAgenda[]): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = [];
  const jsDate = new Date(date);
  const currentMonth = jsDate.getMonth();

  const currentDay = new Date(jsDate.valueOf());
  currentDay.setDate(1);
  const dayOfWeek = currentDay.getDay();
  currentDay.setDate(1 - dayOfWeek);

  do {
      const week: ICalendarCell[] = [];
      for(let i = 0; i < weekDays.length; i++){
          const isoDate = format(currentDay, "d")
          const weekEvents = {
            date: isoDate, 
            events: allEvents.filter((e) => {
                const eventDate = new Date(e.date);
                eventDate.setTime(eventDate.getTime() + eventDate.getTimezoneOffset()*60*1000)
                return isSameDay(eventDate, currentDay)
              })
            }
          week.push(weekEvents);
          currentDay.setDate(currentDay.getDate() + 1);
      }
      weeks.push(week);
  } while(currentDay.getMonth() === currentMonth);

  return weeks;
}