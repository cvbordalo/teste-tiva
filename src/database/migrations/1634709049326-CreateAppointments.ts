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
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'date',
              type: 'timestamp with time zone',
              isNullable: false,
            },
            {
              name: 'email',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'phone',
              type: 'varchar',
              isNullable: false,
            }
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('appointments');
    }

}
