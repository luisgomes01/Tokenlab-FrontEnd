import React from 'react';

import TableCell from '@material-ui/core/TableCell';

interface Props {
  cell: ICalendarCell
}
const CalendarCell: React.FC<Props> = ({cell}) => {

  return (
    <>
      <TableCell key={cell.date} align="center">
        
        <div>{cell.date}</div>
          {cell.events.length > 0 && (<button className="btn btn-unstyled" data-toggle="modal" data-target={"#modalDetails"+cell.date} > <span className="badge badge-primary">{cell.events.length}</span> Evento{cell.events.length>1?"s":""}</button>)}
      </TableCell>
      <div className="modal fade" id={"modalDetails"+cell.date} role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
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
                            <button className="btn btn-sm btn-info">Editar</button>
                            <button className="btn btn-sm btn-danger">Remover</button>
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
