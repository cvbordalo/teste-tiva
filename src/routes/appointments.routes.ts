import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual, parse } from 'date-fns'

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  name: string;
  date: Date;
}

const appointments: Appointment[] = [];

// Creates a new appointment
appointmentsRouter.post('/', (request, response) => {
  const { name, date } = request.body;

  // Adjusts the time format
  const parsedDate = startOfHour(parseISO(date))

  // Checks if the appointment is already booked
  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentInSameDate) {
    return response.status(400).json({ message: 'This appointment is already booked.' });
  }

  const appointment = {
    id: uuid(),
    name,
    date: parsedDate,
  };

  appointments.push(appointment);

  return response.json(appointment);
})

export default appointmentsRouter;
