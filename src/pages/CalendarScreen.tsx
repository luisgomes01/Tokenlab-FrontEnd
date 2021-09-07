import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import { useEffect, useState, useMemo } from 'react';
import { weekDays, getToday, generateCalendar, formatDate } from '../service/calendar';
import {subMonths, addMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import LogOffButton from '../components/LogOffButton';
import NewEventForm from '../components/NewEventForm';

import * as Api from '../api/Event'
const useStyles = makeStyles({
    table: {
      borderTop: "1px solid rgb(224, 224,224)",
      minHeight: "100%",
      "& td ~ td, & th ~ th": {
          borderLeft: "1px solid rgb(224, 224,224)",
      }
    },
    dayOfMonth: {},
    event: {

    }
  });

export function CalendarScreen() {
    const classes = useStyles();
    const [events, setEvents] = useState<EventAgenda[]>([] as EventAgenda[]);
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
            <TableContainer component={"div"}>
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
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    {weekDays.map((day) => (
                    <TableCell key={day} align="center">
                        {day}
                    </TableCell>
                    ))}
                </TableRow>
                </TableHead>
                <TableBody>
                {weeks.map((week, i) => (
                    <TableRow key={i}>
                    {week.map((cell) => (
                        <TableCell key={cell.date} align="center">
                        <div className={classes.dayOfMonth}>{cell.date}</div>
                        {cell.events.map((event, index) => (
                             <div className="btn btn-sm btn-info" key={index}>
                                {format(new Date(event.startEvent), "p", 
                                {locale: ptBR})} - {format(new Date(event.endEvent), "p",  {locale: ptBR})}
                            </div>
                        ))}
                        </TableCell>
                    ))}
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
    );
      
}