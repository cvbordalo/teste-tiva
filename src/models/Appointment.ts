import { uuid } from 'uuidv4'

class Appointment {
  id: string;

  name: string;

  date: Date;

  email: string;

  phone: string;

  constructor(name: string, date: Date, email: string, phone: string) {
    this.id = uuid();
    this.name = name;
    this.date = date;
    this.email = email;
    this.phone = phone;

  }
}

export default Appointment;
