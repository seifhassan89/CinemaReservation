import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMovieShowTable1691002961950 implements MigrationInterface {
    name = 'AddMovieShowTable1691002961950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie_shows" ("id" BIGSERIAL NOT NULL, "hallId" bigint NOT NULL, "movieId" bigint NOT NULL, "partyTimeId" bigint NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, CONSTRAINT "PK_054dec5f26b6d5240d3449b49cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movie_shows" ADD CONSTRAINT "FK_96ca9e0e18df659edfcfd6ae8f4" FOREIGN KEY ("hallId") REFERENCES "halls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_shows" ADD CONSTRAINT "FK_45695855f97ed45a2bcc8ac94ab" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_shows" ADD CONSTRAINT "FK_4627ac857dfa48b2cf17d4c74f5" FOREIGN KEY ("partyTimeId") REFERENCES "party_times"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_shows" DROP CONSTRAINT "FK_4627ac857dfa48b2cf17d4c74f5"`);
        await queryRunner.query(`ALTER TABLE "movie_shows" DROP CONSTRAINT "FK_45695855f97ed45a2bcc8ac94ab"`);
        await queryRunner.query(`ALTER TABLE "movie_shows" DROP CONSTRAINT "FK_96ca9e0e18df659edfcfd6ae8f4"`);
        await queryRunner.query(`DROP TABLE "movie_shows"`);
    }

}
