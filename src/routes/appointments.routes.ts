import { Router } from 'express';
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
})

// Creates a new appointment
appointmentsRouter.post('/', (request, response) => {
  try {
    const { name, date, email, phone } = request.body;

    // Adjusts the time format
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    const appointment = createAppointment.execute({ name, date: parsedDate, email, phone })

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: (err as Error).message })
  }
});

export default appointmentsRouter;
