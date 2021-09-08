import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as Api from '../api/Event';
import {format} from 'date-fns';
import {useCalendarContext} from '../contexts/Calendar'
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

interface Props {
  event?: EventAgenda
}
function makeid(length: number) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}


const NewEventForm: React.FC<Props> = ({ event }) => {
  const uuid = makeid(10)
  const closeButton = useRef<HTMLButtonElement>(null)
  const {addNewEvent, editEvent} = useCalendarContext()
  const classes = useStyles();
  const [description, setDescription] = useState(event?.description || "")
  const [date, setDate] = useState(event?.date || "")
  const [start, setStart] = useState(event?.start || "")
  const [end, setEnd] = useState(event?.end || "")

  const closeModal = () => {
    if (closeButton?.current) {
      closeButton.current.click();
    }
  }
  const createNewEvent = async ()  => {
    try {
      const user_id = localStorage.getItem("user_id")
      if (description && start && end && user_id) {
        const response = await Api.createEvent({
          description, 
          start, 
          end,
          date,
          user_id: Number(user_id)
        })
        alert("Evento adicionado com sucesso!")
        setDescription("");
        addNewEvent(response);
        closeModal();
      }
    } catch (e) {
      console.error(e)
      alert("Erro ao criar evento")
    }
  }

  const updateEvent = async () => {
    try {
      const user_id = localStorage.getItem("user_id")
      if (description && start && end && user_id && event?.id) {
        const id = event?.id;
        const data = {
          description, 
          start, 
          end,
          date,
          user_id: Number(user_id)
        }
        const response = await Api.updateEvent(id, data)
        alert("Evento editado com sucesso!")
        editEvent(response)
        closeModal();
        window.location.reload()
      }
    } catch (error) {
      alert("Falha ao editar evento")
    }
  }
  const onSubmitForm = async () => {
    if (event?.id) {
      updateEvent();
      return ;
    }

    createNewEvent();
    return;
  }
  return (
    <>
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#eventForm"+uuid}>
        {event ? "Editar Evento": "Novo Evento"}
      </button>
      <div className="modal fade" id={"eventForm"+uuid} role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="eventFormTitle">{event? "Editar Evento" :"Adicionar Novo Evento"}</h5>
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
                <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={closeButton}>Fechar</button>
                <button type="button" className="btn btn-primary" onClick={onSubmitForm}>Salvar Alterações</button>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewEventForm;