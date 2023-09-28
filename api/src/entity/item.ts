import { Column, Entity, Unique } from "typeorm";
import { Base } from "./base";
import { Unit } from "./../items/item.interface";
import { ItemType } from "./../items/item.interface";

@Unique("item_sku_constraint", ["sku"])
@Entity()
export class Item extends Base {
  @Column({ unique: true })
  public sku: string;

  @Column()
  public barcode: string;

  @Column()
  public name: string;

  @Column()
  public availableQty: number;

  @Column()
  public reorderLevel: number;

  @Column({
    type: "enum",
    enum: Unit,
    default: Unit.PCS,
  })
  public unit: Unit;

  @Column({
    type: "enum",
    enum: ItemType,
    default: ItemType.MATERIAL,
  })
  public itemType: ItemType;

  @Column()
  public image: string;

  @Column()
  public description: string;
}

export default Item;
