import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReservationTable1691005310808 implements MigrationInterface {
    name = 'AddReservationTable1691005310808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservations" ("id" BIGSERIAL NOT NULL, "seatId" bigint NOT NULL, "movieShowId" bigint NOT NULL, "reservationDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_9ca8462dd93d9e80423ea888976" FOREIGN KEY ("seatId") REFERENCES "seats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_90bda4a5dee812320574510f773" FOREIGN KEY ("movieShowId") REFERENCES "movie_shows"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_90bda4a5dee812320574510f773"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_9ca8462dd93d9e80423ea888976"`);
        await queryRunner.query(`DROP TABLE "reservations"`);
    }

}
