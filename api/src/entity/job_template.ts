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
export class JobTemplate {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public key: string;

  @Column()
  public value: string;

  @Column()
  public bom_id: number;

  @Column({
    type: "enum",
    enum: JobType,
    default: JobType.MAIN_BATCH,
  })
  public jobType: JobType;

  @Column()
  public production_order_template_id: number;

  @Column()
  public user: string;
}

export default JobTemplate;
