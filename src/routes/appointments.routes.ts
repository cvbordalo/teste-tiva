import { Router } from 'express';
import { startOfHour, parseISO, isEqual, parse } from 'date-fns'
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

// Creates a new appointment
appointmentsRouter.post('/', (request, response) => {
  const { name, date, email, phone } = request.body;

  // Adjusts the time format
  const parsedDate = startOfHour(parseISO(date))

  // Checks if the appointment is already booked
  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentInSameDate) {
    return response.status(400).json({ message: 'This appointment is already booked.' });
  }

  const appointment = new Appointment(name, parsedDate, email, phone);

  appointments.push(appointment);

  return response.json(appointment);
})

export default appointmentsRouter;
