import {
  Column,
  Entity,
  Unique,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Unique("bom_name_constraint", ["name"])
@Entity()
export class Bom {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;
}
