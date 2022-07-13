import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1657654790998 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                { name: 'username', type: 'varchar', isPrimary: true },
                { name: 'password', type: 'varchar' },
                { name: 'firstName', type: 'varchar' },
                { name: 'lastName', type: 'varchar' },
                { name: 'email', type: 'varchar' },
                { name: 'birthday', type: 'date' }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
