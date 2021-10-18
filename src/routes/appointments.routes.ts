import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();

const appointments = [];

appointmentsRouter.post('/', (request, response) => {
  const { name, date } = request.body;

  const appointment = {
    id: uuid(),
    name,
    date,
  }

  appointments.push(appointment);

  return response.json(appointment)
})

export default appointmentsRouter;
