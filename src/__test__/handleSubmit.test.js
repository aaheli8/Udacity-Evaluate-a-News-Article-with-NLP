/**
 * @jest-environment jsdom
 */

const { handleSubmit } = require("../client/js/handleSubmit");

describe("handleSubmit", () => {
  it("returns something", () => {
    expect(handleSubmit).toBeDefined();
  });
});
