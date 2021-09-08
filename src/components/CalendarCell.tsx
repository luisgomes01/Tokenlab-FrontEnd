import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import {useCalendarContext} from '../contexts/Calendar';
import NewEventForm from './NewEventForm'
import * as Api from '../api/Event';

interface Props {
  cell: ICalendarCell
}
const CalendarCell: React.FC<Props> = ({cell}) => {
  const {removeEvent} = useCalendarContext();

  const handleOnRemoveEvent = async (event: EventAgenda) => {
    try {
      if(event.id){
        await Api.deleteEvent(event.id)
        removeEvent(event)
        alert("Evento removido com sucesso!")
      }
    } catch(error) {
      alert("Erro ao remover evento!");
    }
  }
  return (
    <>
      <TableCell key={cell.date} align="center">
        
        <div>{cell.date}</div>
          {cell.events.length > 0 && (<button className="btn btn-unstyled" data-toggle="modal" data-target={"#modalDetails"+cell.date} > <span className="badge badge-primary">{cell.events.length}</span> Evento{cell.events.length>1?"s":""}</button>)}
      </TableCell>
      <div className="modal fade" id={"modalDetails"+cell.date} role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalDetailsTitle">Eventos</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Data</th>
                    <th scope="col">Início</th>
                    <th scope="col">Fim</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {cell.events.map(e => (
                      <tr key={e.id}>
                        <td>{e.description}</td>
                        <td>{e.date}</td>
                        <td>{e.start}</td>
                        <td>{e.end}</td>
                        <td>
                          <NewEventForm event={e}/>
                          <button className="btn btn-danger" onClick={() => handleOnRemoveEvent(e)}>Remover</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  ) 
}

export default CalendarCell;
