import { describe, expect, it } from "vitest";

import type { InformationContent, PageType } from "@/types/content";
import { isCategoryHidden } from "./utils";

function category(pages: PageType[]): InformationContent {
  return {
    title: "Test",
    slug: "test",
    pages,
  };
}

const visiblePage: PageType = {
  title: "Open",
  slug: "open",
  description: "",
};

const protectedPage: PageType = {
  title: "Hidden",
  slug: "hidden",
  description: "",
  protected: true,
};

describe("isCategoryHidden", () => {
  it("returns true when the category has no pages", () => {
    expect(isCategoryHidden(category([]))).toBe(true);
  });

  it("returns true when every page is protected", () => {
    expect(isCategoryHidden(category([protectedPage, protectedPage]))).toBe(
      true
    );
  });

  it("returns false when at least one page is not protected", () => {
    expect(isCategoryHidden(category([protectedPage, visiblePage]))).toBe(
      false
    );
  });

  it("returns false when no pages are protected", () => {
    expect(isCategoryHidden(category([visiblePage, visiblePage]))).toBe(false);
  });
});
