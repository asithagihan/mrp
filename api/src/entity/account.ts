import {
  Column,
  Entity,
  Unique,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Unique("account_code_constraint", ["code"])
@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public code: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public address: string;
}

export default Account;
