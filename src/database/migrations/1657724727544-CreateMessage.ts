import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateMessage1657724727544 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'messages',
            columns: [
                {name: 'id', type: 'varchar', isPrimary: true},
                {name: 'sender', type: 'varchar'},
                {name: 'recipient', type: 'varchar'},
                {name: 'text', type: 'text'},
                {name: 'created_at', type: 'timestamp', default: 'now()'}
            ],
            foreignKeys: [
                {
                    name: 'fk_message_sender',
                    columnNames: ['sender'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['username']
                },
                {
                    name: 'fk_message_recipient',
                    columnNames: ['recipient'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['username']
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('messages')
    }

}
