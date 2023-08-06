import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMoviesData1690912616121 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO movies (name, "imageUrl") VALUES ('The Godfather', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffox2now.com%2Fnews%2Fmissouri%2Fthe-godfather-was-nearly-set-in-1970s-st-louis%2F&psig=AOvVaw3ZTWJdoFB47odD6k4ALzxP&ust=1690999311840000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPD-wryFvIADFQAAAAAdAAAAABAE')`,
    );
    await queryRunner.query(
      `INSERT INTO movies (name, "imageUrl") VALUES ('The Dark Knight', 'https://musicart.xboxlive.com/7/abb02f00-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080')`,
    );
    await queryRunner.query(
      `INSERT INTO movies (name, "imageUrl") VALUES ('Angry Men', 'https://m.media-amazon.com/images/I/513TT8BMNFL._AC_UF894,1000_QL80_.jpg')`,
    );
    await queryRunner.query(
      `INSERT INTO movies (name, "imageUrl") VALUES ('Fight Club', 'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM movies WHERE name IN ('The Godfather', 'The Dark Knight', 'Angry Men', 'Fight Club')`,
    );
  }
}
