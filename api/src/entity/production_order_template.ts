import { Column, Entity, Unique, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductionOrderTemplate {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @Column()
  public user: string;
}

export default ProductionOrderTemplate;
