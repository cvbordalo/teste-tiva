import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('timestamp with time zone')
  date: Date;

  @Column()
  email: string;

  @Column()
  phone: string;
}

export default Appointment;
