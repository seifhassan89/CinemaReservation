import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MovieShow } from '../movie-show/movie-show.entity';

@Entity({ name: 'party_times' })
export class PartyTime {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'time' })
  from: string;

  @Column({ type: 'time' })
  to: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    onUpdate: 'NOW()',
    nullable: true,
  })
  updatedAt: Date;

  @OneToMany(() => MovieShow, (movieShow) => movieShow.partyTimeId)
  showMovies: MovieShow[];
}
