import { id } from "date-fns/locale";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateAppointments1634709049326 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'appointments',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'date',
              type: 'timestamp with time zone',
            },
            {
              name: 'email',
              type: 'varchar',
            },
            {
              name: 'phone',
              type: 'varchar',
            },
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('appointments');
    }

}
