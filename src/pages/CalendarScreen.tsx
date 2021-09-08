
import Box from '@material-ui/core/Box';


import CalendarCell from '../components/CalendarCell'

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import { useEffect, useState, useMemo } from 'react';
import { weekDays, getToday, generateCalendar, formatDate } from '../service/calendar';
import {subMonths, addMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import LogOffButton from '../components/LogOffButton';
import NewEventForm from '../components/NewEventForm';

import {useCalendarContext} from '../contexts/Calendar';


import * as Api from '../api/Event'

export function CalendarScreen() {
    const {events, setEvents} = useCalendarContext();
    const [startingDate, setStartingDate] = useState(getToday());

    const weeks = useMemo(() => generateCalendar(startingDate, events), [startingDate, events]);
    const firstDate = useMemo(() => weeks[0][0].date, [weeks]);
    const lastDate = useMemo(() => weeks[weeks.length - 1][6].date, [weeks]);
    

    const nextMonth = () => {
        const currentDateObject = new Date(startingDate);
        const nextDateObject = addMonths(currentDateObject, 1);
        setStartingDate(formatDate(nextDateObject))
    }

    const previousMonth = () => {
        const currentDateObject = new Date(startingDate);
        const previousDateObject = subMonths(currentDateObject, 1);
        setStartingDate(formatDate(previousDateObject))
    }
    useEffect(()=> {
        (async ()=>{
            try {
                const response = await Api.listEvents();
                setEvents(response)
            } catch (error) {
                alert("Erro ao carregar eventos")
            }
        })()
    }, [firstDate, lastDate]);

    return (
        <Box display="flex" height="100%" alignItems="stretch">
            <Box
            borderRight="1px solid rgb(224, 224,224)"
            width="16em"
            padding="8px 16px"
            >
            <h2>Agenda React</h2>
            <NewEventForm />
            </Box>
            <div className="container-fluid">
                <Box display="flex" alignItems="center" padding="8px 16px">
                    <Box flex="1">
                    <IconButton aria-label="Mês anterior" onClick={previousMonth}>
                        <Icon>chevron_left</Icon>
                    </IconButton>
                    <IconButton aria-label="Próximo mês" onClick={nextMonth}>
                        <Icon>chevron_right</Icon>
                    </IconButton>
                    <Box marginLeft="16px" component="strong">
                        {format(new Date(startingDate), "MMMM yyyy", {locale: ptBR}).toLocaleUpperCase()} 
                    </Box>
                    </Box>
                    <LogOffButton/>
                </Box>
                <table className="table">
                    <thead>
                        <tr>
                            {weekDays.map((day) => (
                            <th key={day} scope="col">
                                {day}
                            </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                    {weeks.map((week, i) => (
                        <tr key={i}>
                        {week.map((cell, index) => (
                            <CalendarCell cell={cell}/>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Box>
    );
      
}