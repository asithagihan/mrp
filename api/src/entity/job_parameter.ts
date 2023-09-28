import { Column, Entity, Unique, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class JobParameter {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public key: string;

  @Column()
  public value: string;
}

export default JobParameter;
