import type { Element, Root } from "hast";

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
          if (node.type === "element") {
            const element = node as Element;
            if (element.tagName === "a") {
              const href = element.properties?.href;
              const isExternalForm =
                element.properties?.dataExternalForm !== undefined;
              if (typeof href === "string") {
                const isStartLink = href.endsWith("/start");
                // Has cookie: hide external form links
                if (hasResearchAccess && isExternalForm) return false;
                // No cookie: hide /start links
                if (!hasResearchAccess && isStartLink) return false;
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
