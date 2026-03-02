import type { Element, ElementContent, Root } from "hast";

type Options = {
  hasResearchAccess?: boolean;
};

function rehypeHideStartLinks(options: Options = {}) {
  const { hasResearchAccess = false } = options;

  return (tree: Root) => {
    // Recursively filter links based on access
    // - Has cookie: show /start links, hide external form links (marked with data-external-form)
    // - No cookie: show external form links, hide /start links
    const filterChildren = (children: Root["children"]): Root["children"] =>
      children
        .filter((node) => {
          if (node.type !== "element") return true;
          const element = node as Element;
          // Hide start links inside list items
          if (element.tagName === "li") {
            return !containsStartLink(element, hasResearchAccess);
          }
          // Hide start links if they have a data-external-form attribute
          if (shouldHideStartLink(element, hasResearchAccess)) return false;
          return true;
        })
        .map((node) => {
          if (node.type === "element" && (node as Element).children) {
            const element = node as Element;
            return {
              ...element,
              children: filterChildren(element.children) as Element["children"],
            };
          }
          return node;
        });

    tree.children = filterChildren(tree.children);
  };
}

// Check if an element contains a start link
function containsStartLink(
  node: ElementContent,
  hasResearchAccess: boolean
): boolean {
  if (node.type === "element") {
    const element = node as Element;
    if (shouldHideStartLink(element, hasResearchAccess)) return true;
    return element.children.some((child) =>
      containsStartLink(child, hasResearchAccess)
    );
  }
  return false;
}

// Check if it anchor and if it has a data-start-link attribute
function shouldHideStartLink(element: Element, hasResearchAccess: boolean): boolean {
  if (element.tagName !== "a") return false;
  const href = element.properties?.href;
  const isExternalForm =
    element.properties?.dataExternalForm !== undefined;
  if (typeof href !== "string") return false;
  const isStartLink = href.endsWith("/start");
  // Has cookie: hide external form links
  if (hasResearchAccess && isExternalForm) return true;
  // No cookie: hide /start links
  if (!hasResearchAccess && isStartLink) return true;
  return false;
}

export default rehypeHideStartLinks;
