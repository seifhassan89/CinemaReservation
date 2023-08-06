import { Hall } from 'src/hall/hall.entity';
import { Reservation } from 'src/reservation/reservation.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'seats' })
export class Seat {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  row: string;

  @Column()
  col: number;

  @Column()
  hallId: number;

  @JoinColumn({ name: 'hallId', referencedColumnName: 'id' })
  @ManyToOne(() => Hall, (hall) => hall.showMovies, {
    nullable: false,
  })
  hall: Hall;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    onUpdate: 'NOW()',
    nullable: true,
  })
  updatedAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.seatId)
  reservation: Reservation[];
}
