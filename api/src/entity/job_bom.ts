import {
  Column,
  Entity,
  Unique,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Unique("job_bom_name_constraint", ["name"])
@Entity()
export class JobBom {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;
}
