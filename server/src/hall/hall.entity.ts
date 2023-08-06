import { MovieShow } from '../../src/movie-show/movie-show.entity';
// import { Seat } from '../../src/seat/seat.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'halls' })
export class Hall {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    onUpdate: 'NOW()',
    nullable: true,
  })
  updatedAt: Date;

  @OneToMany(() => MovieShow, (movieShow) => movieShow.hallId)
  showMovies: MovieShow[];

//   @OneToMany(() => Seat, (seat) => seat.hallId)
//   seats: Seat[];
}
