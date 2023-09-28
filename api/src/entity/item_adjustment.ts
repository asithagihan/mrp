import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ItemAdjustment {
  @PrimaryGeneratedColumn()
  public id: number;

  public name: string;

  @Column()
  public user: string;
}

export default ItemAdjustment;
