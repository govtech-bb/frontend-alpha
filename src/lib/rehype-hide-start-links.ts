import type { Element, Root } from "hast";

type Options = {
  hideStartLinks?: boolean;
};

function rehypeHideStartLinks(options: Options = {}) {
  const { hideStartLinks = false } = options;

  return (tree: Root) => {
    if (!hideStartLinks) {
      return;
    }

    // Recursively filter out <a> elements with href ending in "/start"
    const filterChildren = (children: Root["children"]): Root["children"] =>
      children
        .filter((node) => {
          if (node.type === "element") {
            const element = node as Element;
            if (element.tagName === "a") {
              const href = element.properties?.href;
              if (typeof href === "string" && href.endsWith("/start")) {
                return false;
              }
            }
          }
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

export default rehypeHideStartLinks;
