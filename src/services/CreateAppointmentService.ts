import { startOfHour } from "date-fns";

import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository"

interface Request {
  name: string,
  date: Date,
  email: string,
  phone: string
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({name, date, email, phone}: Request): Appointment {
    const appointmentDate = startOfHour(date);

    // Checks if the appointment is already booked
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }


    const appointment = this.appointmentsRepository.create({
      name,
      date: appointmentDate,
      email,
      phone
    });

    return appointment;
  }
}

export default CreateAppointmentService;
