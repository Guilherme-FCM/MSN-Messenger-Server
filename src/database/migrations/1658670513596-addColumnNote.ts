import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addColumnNote1658670513596 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({ 
            name: 'note', 
            type: 'varchar', 
            isNullable: true 
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'note')
    }

}
