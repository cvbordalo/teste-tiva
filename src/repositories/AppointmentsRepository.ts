import { isEqual } from "date-fns";
import Appointment from "../models/Appointment";

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  // Lists all apointments
  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    // Checks if the appointment is already booked
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  // Creates a new appointment
  public create(name: string, date: Date, email: string, phone: string): Appointment {
     const appointment = new Appointment(name, date, email, phone);

     this.appointments.push(appointment);

     return appointment;
  }
}

export default AppointmentsRepository;
