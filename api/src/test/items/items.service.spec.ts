import { assert } from "chai";
import { find } from "../../items/items.service";

describe("Calculator Tests", () => {
  it("should return 5 when 2 is added to 3", async () => {
    const result = await find(2);
    assert.equal(result, {
      id: 2,
      name: "Pizza",
      price: 299,
      description: "Cheesy",
      image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png",
    });
  });
});
