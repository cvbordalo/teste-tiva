import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// Creates a new appointment
appointmentsRouter.post('/', (request, response) => {
  const { name, date, email, phone } = request.body;

  // Adjusts the time format
  const parsedDate = startOfHour(parseISO(date))

  const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);

  if (findAppointmentInSameDate) {
    return response.status(400).json({ message: 'This appointment is already booked.' });
  }


  const appointment = appointmentsRepository.create(name, parsedDate, email, phone)

  return response.json(appointment);
})

export default appointmentsRouter;
