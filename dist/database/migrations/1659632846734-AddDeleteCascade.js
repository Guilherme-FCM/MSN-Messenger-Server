"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDeleteCascade1659632846734 = void 0;
class AddDeleteCascade1659632846734 {
    constructor() {
        this.name = 'AddDeleteCascade1659632846734';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "fk_message_sender"`);
            yield queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "fk_message_recipient"`);
            yield queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_fc6f083269edb7a7798cdf13b08" FOREIGN KEY ("sender") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_47af3602906d1c405ac90792fbe" FOREIGN KEY ("recipient") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_47af3602906d1c405ac90792fbe"`);
            yield queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_fc6f083269edb7a7798cdf13b08"`);
            yield queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "fk_message_recipient" FOREIGN KEY ("recipient") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "fk_message_sender" FOREIGN KEY ("sender") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE`);
        });
    }
}
exports.AddDeleteCascade1659632846734 = AddDeleteCascade1659632846734;
