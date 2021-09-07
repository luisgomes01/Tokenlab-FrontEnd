import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as Api from '../api/Event';
import {format} from 'date-fns';

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
  const [date, setDate] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")

  const onSubmitForm = async () => {

    try {
      const user_id = localStorage.getItem("user_id")
      if (start && end && user_id) {
        const startEvent = start;
        const endEvent = end;
        const response = await Api.createEvent({
          description, 
          start, 
          end,
          date,
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
                      label="Data"
                      type="date"
                      defaultValue={format(new Date(Date.now()), "yyyy-MM-dd")}
                      value={date}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e)=> {
                        const newDate = new Date(e.target.value)
                        newDate.setTime(newDate.getTime() + newDate.getTimezoneOffset()*60*1000)
                        setDate(format(newDate, "yyyy-MM-dd"))
                      }}
                      required
                    />
                    <TextField
                      id="time"
                      label="Horário de Início"
                      type="time"
                      value={start}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 900, // 5 min
                      }}
                      onChange={(e)=> setStart(e.target.value)}
                      required
                    />
                    <TextField
                      id="time"
                      label="Horário de Fim"
                      type="time"
                      value={end}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 900, // 5 min
                      }}
                      onChange={(e)=> setEnd(e.target.value)}
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