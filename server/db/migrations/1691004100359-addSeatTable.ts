import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSeatTable1691004100359 implements MigrationInterface {
    name = 'AddSeatTable1691004100359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "seats" ("id" BIGSERIAL NOT NULL, "row" character varying NOT NULL, "col" integer NOT NULL, "hallId" bigint NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, CONSTRAINT "PK_3fbc74bb4638600c506dcb777a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "seats" ADD CONSTRAINT "FK_81d1647b12c00bb1bf48ced7136" FOREIGN KEY ("hallId") REFERENCES "halls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seats" DROP CONSTRAINT "FK_81d1647b12c00bb1bf48ced7136"`);
        await queryRunner.query(`DROP TABLE "seats"`);
    }

}
