import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedHallsData1690914027920 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO halls (name) VALUES ('Business Hall')`,
    );
    await queryRunner.query(`INSERT INTO halls (name) VALUES ('A Class Hall')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM halls WHERE name IN ('Business Hall', 'A Class Hall')`,
    );
  }
}
