/**
 * Data Model Interfaces
 */
import { IBaseItem, IItem } from "./item.interface";
import { Item } from "../entity/item";
import { dataSource } from "../app-data-source";
const itemRepository = dataSource.getRepository<IItem>(Item);


/**
 * Service Methods
 */

export const findAll = async (): Promise<IItem[]> => {
  const items = await itemRepository.find({});
  return items;
};


export const find = async (id: number): Promise<IItem> => {
  const item = await itemRepository.findOneBy({
    id,
  });
  return item;
};

export const create = async (newItem: IBaseItem): Promise<IItem> => {
  console.log("create : ", newItem);
  const item = await itemRepository.save(newItem);

  return item;
};

export const update = async (
  id: number,
  itemUpdate: IBaseItem
): Promise<IItem | null> => {
  console.log("update : ", itemUpdate);
  const item = await itemRepository.save({
    id,
    ...itemUpdate,
  });

  if (!item) {
    return null;
  }

  return item;
};

export const remove = async (id: number): Promise<null | void> => {
  console.log("delete", id);
  const result = await itemRepository.delete(id);
  console.log(result);
  if (!result) {
    return null;
  }
};
