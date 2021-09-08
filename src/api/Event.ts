import Api from '.';

export const listEvents = async (): Promise<EventAgenda[]> => {
  const response = await Api.get('/events');
  return response.data
}

export const  createEvent =  async (data: EventAgenda) => {
  const response = await Api.post('/events', data);
  return response.data;
}

export const updateEvent = async (id: number, data: EventAgenda) => {
  const response = await Api.put(`/events/${id}`, data);
  return response.data
}

export const deleteEvent = async (id: number) => {
  const response = await  Api.delete(`/events/${id}`);
  return response.data;
}