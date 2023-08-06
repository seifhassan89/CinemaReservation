import { Hall } from '../../src/hall/hall.entity';
import { Movie } from '../../src/movie/movie.entity';
import { PartyTime } from '../../src/party-time/party-time.entity';
import { Reservation } from '../../src/reservation/reservation.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'movie_shows' })
export class MovieShow {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  hallId: number;

  @JoinColumn({ name: 'hallId', referencedColumnName: 'id' })
  @ManyToOne(() => Hall, (hall) => hall.showMovies, {
    nullable: false,
  })
  hall: Hall;

  @Column()
  movieId: number;

  @JoinColumn({ name: 'movieId', referencedColumnName: 'id' })
  @ManyToOne(() => Movie, (movie) => movie.showMovies, {
    nullable: false,
  })
  movie: Movie;

  @Column()
  partyTimeId: number;

  @JoinColumn({ name: 'partyTimeId', referencedColumnName: 'id' })
  @ManyToOne(() => PartyTime, (PartyTime) => PartyTime.showMovies, {
    nullable: false,
  })
  partyTime: PartyTime;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    onUpdate: 'NOW()',
    nullable: true,
  })
  updatedAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.movieShowId)
  reservation: Reservation[];
}
