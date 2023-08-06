import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPartyTimeTable1691002112853 implements MigrationInterface {
    name = 'AddPartyTimeTable1691002112853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "party_times" ("id" BIGSERIAL NOT NULL, "from" TIME NOT NULL, "to" TIME NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, CONSTRAINT "PK_fa248447534f34764ce4b313fc4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "party_times"`);
    }

}
