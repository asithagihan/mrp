import { IBase } from "./../common/base.interface";

export enum Unit {
  ML = "ml",
  PCS = "pcs",
  GRAMS = "g",
}

export enum ItemType {
  FINISHED_PRODUCT = "FINISHED_PRODUCT",
  PACKAGING = "PACKAGING",
  MATERIAL = "MATERIAL",
  MAIN_BATCH = "MAIN_BATCH",
  INPROGRESS_PRODUCT = "INPROGRESS_PRODUCT",
  CONSUMABLE = "CONSUMABLE",
}

export interface IBaseItem {
  sku: string;
  barcode: string;
  name: string;
  availableQty: number;
  reorderLevel: number;
  unit: Unit;
  itemType: ItemType;
  image: string;
  description: string;
}

export interface IItem extends IBaseItem, IBase {}
