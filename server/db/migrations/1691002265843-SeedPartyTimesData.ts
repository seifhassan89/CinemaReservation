import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedPartyTimesData1691002265843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO party_times ("from", "to") VALUES ('12:00:00', '14:00:00')`,
    );
    await queryRunner.query(
      `INSERT INTO party_times ("from", "to") VALUES ('15:00:00', '17:00:00')`,
    );
    await queryRunner.query(
      `INSERT INTO party_times ("from", "to") VALUES ('18:00:00', '20:00:00')`,
    );
    await queryRunner.query(
      `INSERT INTO party_times ("from", "to") VALUES ('21:00:00', '23:00:00')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM party_times`);
  }
}
