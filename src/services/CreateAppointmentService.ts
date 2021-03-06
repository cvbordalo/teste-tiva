import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository"

interface Request {
  provider_id: string,
  date: Date,
  email: string,
  phone: string
}

class CreateAppointmentService {
  public async execute({provider_id, date, email, phone}: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }


    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      email,
      phone
    });

    await appointmentsRepository.save(appointment)

    return appointment;
  }
}

export default CreateAppointmentService;
