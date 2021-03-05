import { isExternal } from "@/utils/validate";

describe("Validate", () => {
  it("isExternal", () => {
    expect(isExternal("https://github.com/BiYuqi/vue3-element-admin")).toBe(
      true
    );
    expect(isExternal("github.com/BiYuqi/vue3-element-admin")).toBe(false);
    expect(isExternal("/dashboard")).toBe(false);
    expect(isExternal("./dashboard")).toBe(false);
    expect(isExternal("dashboard")).toBe(false);
  });
});
