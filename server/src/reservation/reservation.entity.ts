import { MovieShow } from '../../src/movie-show/movie-show.entity';
import { Seat } from '../../src/seat/seat.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  seatId: number;

  @JoinColumn({ name: 'seatId', referencedColumnName: 'id' })
  @ManyToOne(() => Seat, (seat) => seat.reservation, {
    nullable: false,
  })
  seat: Seat;

  @Column()
  movieShowId: number;

  @JoinColumn({ name: 'movieShowId', referencedColumnName: 'id' })
  @ManyToOne(() => MovieShow, (movieShow) => movieShow.reservation, {
    nullable: false,
  })
  movieShow: MovieShow;

  @Column('timestamp')
  reservationDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    onUpdate: 'NOW()',
    nullable: true,
  })
  updatedAt: Date;
}
