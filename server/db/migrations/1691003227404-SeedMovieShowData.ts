import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMovieShowData1691003227404 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO movie_shows ("hallId", "movieId", "partyTimeId") VALUES (1, 1, 1)`,
    );
    await queryRunner.query(
      `INSERT INTO movie_shows ("hallId", "movieId", "partyTimeId") VALUES (2, 2, 2)`,
    );
    await queryRunner.query(
      `INSERT INTO movie_shows ("hallId", "movieId", "partyTimeId") VALUES (1, 3, 3)`,
    );
    await queryRunner.query(
      `INSERT INTO movie_shows ("hallId", "movieId", "partyTimeId") VALUES (2, 4, 4)`,
    );
    await queryRunner.query(
      `INSERT INTO movie_shows ("hallId", "movieId", "partyTimeId") VALUES (2, 4, 1)`,
    );
    await queryRunner.query(
      `INSERT INTO movie_shows ("hallId", "movieId", "partyTimeId") VALUES (1, 3, 2)`,
    );
    await queryRunner.query(
      `INSERT INTO movie_shows ("hallId", "movieId", "partyTimeId") VALUES (2, 2, 3)`,
    );
    await queryRunner.query(
      `INSERT INTO movie_shows ("hallId", "movieId", "partyTimeId") VALUES (1, 1, 4)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM movie_shows`);
  }
}
