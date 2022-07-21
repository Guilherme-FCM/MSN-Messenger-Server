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
exports.CreateMessage1657724727544 = void 0;
const typeorm_1 = require("typeorm");
class CreateMessage1657724727544 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'messages',
                columns: [
                    { name: 'id', type: 'varchar', isPrimary: true },
                    { name: 'sender', type: 'varchar' },
                    { name: 'recipient', type: 'varchar' },
                    { name: 'text', type: 'text' },
                    { name: 'created_at', type: 'timestamp', default: 'now()' }
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
            }), true);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('messages');
        });
    }
}
exports.CreateMessage1657724727544 = CreateMessage1657724727544;
