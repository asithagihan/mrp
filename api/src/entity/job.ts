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
export class Job {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @Column({
    type: "enum",
    enum: JobType,
    default: JobType.MAIN_BATCH,
  })
  public jobType: JobType;

  @Column()
  public job_bom_id: number;

  @Column()
  public production_order_id: number;

  @Column()
  public user: string;
}

export default Job;
