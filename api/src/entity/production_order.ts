import { Column, Entity, Unique, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductionOrder {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @Column()
  public production_plan_id: number;

  @Column()
  public user: string;
}

export default ProductionOrder;
