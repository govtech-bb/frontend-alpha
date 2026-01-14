import type { Element, ElementContent, Root } from "hast";

function rehypeSectionise() {
  return (tree: Root) => {
    const wrapSection = (children: ElementContent[]): Element => ({
      type: "element",
      tagName: "div",
      properties: {
        className: "space-y-s",
      },
      children,
    });

    const result: ElementContent[] = [];
    let buffer: ElementContent[] = [];

    for (const node of tree.children) {
      if (
        node.type === "element" &&
        (node.tagName === "h2" || node.tagName === "h3")
      ) {
        // Wrap previous content if exists
        if (buffer.length > 0) {
          result.push(wrapSection(buffer));
          buffer = [];
        }
        // Start new section with heading
        buffer.push(node);
      } else if (node.type === "element" || node.type === "text") {
        buffer.push(node);
      }
    }

    // Wrap remaining content
    if (buffer.length > 0) {
      result.push(wrapSection(buffer));
    }

    tree.children = result;
  };
}

export default rehypeSectionise;
