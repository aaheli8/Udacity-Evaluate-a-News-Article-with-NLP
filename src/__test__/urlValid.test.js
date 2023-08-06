const { isValidURL } = require("../client/js/urlValid");

describe("urlValidity", () => {
  test("test if strings are false urls", () => {
    expect(isValidURL("meow")).toBeFalsy();
  });

  test("emails are not considered valid urls", () => {
    expect(isValidURL("sadhukhanaheli@gmail.com")).toBeFalsy();
  });

  test("expect urls to be true", () => {
    expect(isValidURL("https://www.google.com")).toBeTruthy();
  });

  test("expect empty string to be falsy", () => {
    expect(isValidURL("")).toBeFalsy();
  });
});
