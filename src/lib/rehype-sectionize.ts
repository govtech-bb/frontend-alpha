import type { Element, ElementContent, Root } from "hast";

function rehypeSectionize() {
  return (tree: Root) => {
    const wrapSection = (
      children: ElementContent[],
      headingLevel?: "h2" | "h3"
    ): Element => ({
      type: "element",
      tagName: "div",
      properties: {
        className:
          headingLevel === "h3"
            ? ["space-y-2", "font-normal", "text-[20px]", "leading-[1.7]"]
            : ["space-y-4", "font-normal", "text-[20px]", "leading-[1.7]"],
      },
      children,
    });

    const result: ElementContent[] = [];
    let buffer: ElementContent[] = [];
    let currentHeadingLevel: "h2" | "h3" | undefined;

    for (const node of tree.children) {
      if (
        node.type === "element" &&
        (node.tagName === "h2" || node.tagName === "h3")
      ) {
        // Wrap previous content if exists
        if (buffer.length > 0) {
          result.push(wrapSection(buffer, currentHeadingLevel));
          buffer = [];
        }
        // Start new section with heading
        currentHeadingLevel = node.tagName as "h2" | "h3";
        buffer.push(node);
      } else if (node.type === "element" || node.type === "text") {
        buffer.push(node);
      }
    }

    // Wrap remaining content
    if (buffer.length > 0) {
      result.push(wrapSection(buffer, currentHeadingLevel));
    }

    tree.children = result;
  };
}

export default rehypeSectionize;
