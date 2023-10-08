import { assert } from "chai";
import { find } from "../../items/items.service";

describe("Calculator Tests", () => {
  it("should return 5 when 2 is added to 3", async () => {
    const result = await find(2);
    // assert.equal(result, {
    //   id: 2,
    //   sku: "",
    //   barcode: "",
    //   name: "",
    //   availableQty: 3,
    //   reorderLevel: 1,
    //   unit: Unit.CM,
    //   itemType: ItemType.PACKAGING,
    //   image: "",
    //   description: "",
    //   createdAt: Date(),
    // });
  });
});
