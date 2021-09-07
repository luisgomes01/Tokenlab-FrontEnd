import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as Api from '../api/Event'
import {format} from 'date-fns'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);

const NewEventForm: React.FC = () => {
  const classes = useStyles();
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(startDate)

  const onSubmitForm = async () => {

    try {
      const user_id = localStorage.getItem("user_id")
      if (startDate && endDate && user_id) {
        const startEvent = startDate.toISOString();
        const endEvent = endDate.toISOString();
        const response = await Api.createEvent({
          description, 
          startEvent, 
          endEvent,
          user_id: Number(user_id)
        })
        setDescription("")
      }
    } catch (e) {
      console.error(e)
      alert("Erro ao criar evento")
    }

  }
  return (
    <>
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
        Novo Evento
      </button>
      <div className="modal fade" id="exampleModalCenter" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Adicionar Novo Evento</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              
                <div className="form-group">
                  <label htmlFor="description">Descrição</label>
                  <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} id="description"  className="form-control" required />
                </div>
                <div className="form-group">
                    <TextField
                      id="time"
                      label="Data"
                      type="date"
                      defaultValue={startDate}
                      value={format(startDate, "yyyy-MM-dd")}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e)=> setStartDate(new Date(e.target.value))}
                      required
                    />
                    <TextField
                      id="time"
                      label="Horário de Início"
                      type="time"
                      value={format(startDate, "HH:mm")}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 900, // 5 min
                      }}
                      onChange={(e)=>setStartDate(new Date(e.target.value))}
                      required
                    />
                    <TextField
                      id="time"
                      label="Horário de Fim"
                      type="time"
                      value={format(endDate, "HH:mm")}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 900, // 5 min
                      }}
                      onChange={(e)=>setEndDate(new Date(e.target.value))}
                      required
                    />
                    </div>
                </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={onSubmitForm}>Save changes</button>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewEventForm;