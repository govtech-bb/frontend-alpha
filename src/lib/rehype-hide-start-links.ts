import type { Element, ElementContent, Root } from "hast";

type Options = {
  hasResearchAccess?: boolean;
};

const WAYS_TO_APPLY_REGEX = /are (\d+) ways|are ([a-zA-Z]+) ways/i;
const WORD_TO_NUMBER: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
} as const;

function rehypeHideStartLinks(options: Options = {}) {
  const { hasResearchAccess = false } = options;
  let removedLinksCount = 0; // Tracks the number of links removed to adjust the description text accordingly

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
            const containsStartLinkResult = containsStartLink(
              element,
              hasResearchAccess
            );

            if (containsStartLinkResult) {
              removedLinksCount++;
            }
            return !containsStartLinkResult;
          }

          // Hide start links if they have a data-external-form attribute
          if (shouldHideStartLink(element, hasResearchAccess)) {
            removedLinksCount++;
            return false;
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

    // After filtering links/methods, update the description text if necessary
    if (removedLinksCount > 0) {
      updateDescriptionText(
        tree.children,
        hasResearchAccess,
        removedLinksCount
      );
    }
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
function shouldHideStartLink(
  element: Element,
  hasResearchAccess: boolean
): boolean {
  if (element.tagName !== "a") return false;
  const href = element.properties?.href;
  const isExternalForm = element.properties?.dataExternalForm !== undefined;
  if (typeof href !== "string") return false;
  const isStartLink = href.endsWith("/start");
  // Has cookie: hide external form links
  if (hasResearchAccess && isExternalForm) return true;
  // No cookie: hide /start links
  if (!hasResearchAccess && isStartLink) return true;
  return false;
}

function shouldReplaceDescriptionText(
  element: Element,
  hasResearchAccess: boolean
): boolean {
  if (element.tagName !== "p") return false;

  const textContent = element.children
    .filter((child) => child.type === "text")
    .map((child) => child.value)
    .join("");

  return WAYS_TO_APPLY_REGEX.test(textContent) && !hasResearchAccess;
}

function updateDescriptionText(
  children: Root["children"],
  hasResearchAccess: boolean,
  linksRemovedCount: number
): void {
  children.forEach((node) => {
    if (node.type === "element") {
      const element = node as Element;

      if (shouldReplaceDescriptionText(element, hasResearchAccess)) {
        const textContent = element.children
          .filter((child) => child.type === "text")
          .map((child) => child.value)
          .join("");

        const newTextContent = textContent.replace(
          WAYS_TO_APPLY_REGEX,
          (match, numberPattern, wordPattern) => {
            let ways = Number.parseInt(numberPattern, 10);

            // If numberPattern is not a number, try to convert wordPattern (word) to a number. E.g., "two" to 2
            if (isNaN(ways) && wordPattern in WORD_TO_NUMBER) {
              ways = WORD_TO_NUMBER[wordPattern as keyof typeof WORD_TO_NUMBER];
            }

            // If we still couldn't parse a number, return the original match
            if (isNaN(ways)) {
              return match;
            }

            const newWays = Math.max(0, ways - linksRemovedCount);
            if (newWays === 1) {
              return `is ${newWays} way`;
            }
            return `are ${newWays} ways`;
          }
        );

        element.children = [
          {
            type: "text",
            value: newTextContent,
          },
        ];
      }

      if (element.children) {
        updateDescriptionText(
          element.children,
          hasResearchAccess,
          linksRemovedCount
        );
      }
    }
  });
}

export default rehypeHideStartLinks;
