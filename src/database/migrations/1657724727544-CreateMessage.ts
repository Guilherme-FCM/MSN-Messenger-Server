import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateMessage1657724727544 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'messages',
            columns: [
                {name: 'id', type: 'varchar', isPrimary: true},
                {name: 'senderUsername', type: 'varchar'},
                {name: 'recipientUsername', type: 'varchar'},
                {name: 'text', type: 'text'},
                {name: 'created_at', type: 'timestamp', default: 'now()'}
            ],
            foreignKeys: [
                {
                    name: 'fk_message_sender',
                    columnNames: ['senderUsername'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['username']
                },
                {
                    name: 'fk_message_recipient',
                    columnNames: ['recipientUsername'],
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
