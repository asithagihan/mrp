import { Column, Entity, Unique, PrimaryGeneratedColumn } from "typeorm";

export enum JobType {
  MAIN_BATCH = "MAIN_BATCH",
  CURING = "CURING",
  CUTTING = "CUTTING",
  MOULDING = "MOULDING",
  QA = "QA",
  LABEL_PRINTING = "LABEL_PRINTING",
  FILLING = "FILLING",
  PACKING = "PACKING",
}

@Entity()
export class ProductionPlan {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public user: string;
}

export default ProductionPlan;
