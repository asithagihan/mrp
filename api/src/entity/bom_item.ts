import {
  Column,
  Entity,
  Unique,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class BomItem {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public itemId: number;

  @Column()
  public bomId: number;

  @Column()
  public qty: string;
}
