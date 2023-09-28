import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ItemAdjustmentEntry {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public itemId: string;

  @Column()
  public quantity: number;

  @Column()
  public itemAdjustment: number;
}

export default ItemAdjustmentEntry;
