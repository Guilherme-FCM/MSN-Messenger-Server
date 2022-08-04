import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeleteCascade1659632846734 implements MigrationInterface {
    name = 'AddDeleteCascade1659632846734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "fk_message_sender"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "fk_message_recipient"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_fc6f083269edb7a7798cdf13b08" FOREIGN KEY ("sender") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_47af3602906d1c405ac90792fbe" FOREIGN KEY ("recipient") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_47af3602906d1c405ac90792fbe"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_fc6f083269edb7a7798cdf13b08"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "fk_message_recipient" FOREIGN KEY ("recipient") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "fk_message_sender" FOREIGN KEY ("sender") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
