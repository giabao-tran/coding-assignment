import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  building: string;

  @Column()
  name: string;

  @Column({ unique: true })
  location_number: string;

  @Column('decimal', { precision: 10, scale: 3, nullable: true })
  area: number;

  @ManyToOne(() => Location, (location) => location.children)
  parent: Location;

  @OneToMany(() => Location, (location) => location.parent)
  children: Location[];
}
