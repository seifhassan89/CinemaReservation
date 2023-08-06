import { MigrationInterface, QueryRunner } from "typeorm"

export class SeedSeatData1691005007740 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('A', 1, 1)`,
        );
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('A', 2, 1)`,
        );
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('A', 3, 1)`,
        );
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('B', 1, 1)`,
        );
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('B', 2, 1)`,
        );
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('B', 3, 1)`,
        );
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('C', 1, 1)`,
        );
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('C', 2, 1)`,
        );
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('C', 3, 1)`,
        );
    
        //   hall 2
    
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('A', 1, 2)`,
        );
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('A', 2, 2)`,
        );
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('A', 3, 2)`,
        );
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('B', 1, 2)`,
        );
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('B', 2, 2)`,
        );
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('B', 3, 2)`,
        );
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('C', 1, 2)`,
        );
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('C', 2, 2)`,
        );
        await queryRunner.query(
          `INSERT INTO seats ("row", "col", "hallId") VALUES ('C', 3, 2)`,
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM seats`);
      }
}
