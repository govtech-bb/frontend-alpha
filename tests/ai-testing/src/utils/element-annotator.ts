import type { Page } from "@playwright/test";

export interface AnnotatedElement {
  id: number;
  selector: string;
  role: string;
  name: string;
  value?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Annotate interactive elements on a screenshot with numbered boxes
 * Returns both the annotated image and a map of element IDs to their metadata
 */
export async function annotatePageWithElements(
  page: Page,
  screenshotPath: string
): Promise<{
  annotatedImage: Buffer;
  elementMap: Record<number, AnnotatedElement>;
}> {
  // Get all interactive elements with their bounding boxes
  const elementsWithBoxes = await page.evaluate(() => {
    const elements: Array<{
      selector: string;
      role: string;
      name: string;
      value?: string;
      box: DOMRect | null;
    }> = [];

    const interactiveElements = document.querySelectorAll(
      "input, button, select, textarea, [role='button'], [role='tab'], label, a"
    );

    interactiveElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const computedStyle = window.getComputedStyle(htmlEl);
      const isVisible =
        computedStyle.display !== "none" &&
        computedStyle.visibility !== "hidden" &&
        htmlEl.offsetHeight > 0;

      if (isVisible && htmlEl.offsetParent !== null) {
        let selector = "";

        // Generate reliable selector
        if (htmlEl.id) {
          selector = `#${htmlEl.id}`;
        } else if (
          htmlEl.tagName === "INPUT" ||
          htmlEl.tagName === "SELECT" ||
          htmlEl.tagName === "TEXTAREA"
        ) {
          const input = htmlEl as HTMLInputElement;
          if (input.name) {
            selector = `${htmlEl.tagName.toLowerCase()}[name='${input.name}']`;
          } else if (input.type) {
            selector = `${htmlEl.tagName.toLowerCase()}[type='${input.type}']`;
          } else if (input.placeholder) {
            selector = `${htmlEl.tagName.toLowerCase()}[placeholder='${input.placeholder}']`;
          } else if (htmlEl.getAttribute("aria-label")) {
            selector = `${htmlEl.tagName.toLowerCase()}[aria-label='${htmlEl.getAttribute("aria-label")}']`;
          } else {
            selector = htmlEl.tagName.toLowerCase();
          }
        } else if (htmlEl.tagName === "BUTTON" || htmlEl.tagName === "A") {
          const text = htmlEl.textContent?.trim().substring(0, 50);
          if (text) {
            selector = `${htmlEl.tagName.toLowerCase()}:has-text('${text}')`;
          } else if (htmlEl.getAttribute("aria-label")) {
            selector = `${htmlEl.tagName.toLowerCase()}[aria-label='${htmlEl.getAttribute("aria-label")}']`;
          } else {
            selector = htmlEl.tagName.toLowerCase();
          }
        } else if (htmlEl.tagName === "LABEL") {
          const text = htmlEl.textContent?.trim().substring(0, 50);
          if (text) {
            selector = `label:has-text('${text}')`;
          }
        } else {
          selector = htmlEl.className
            ? `.${htmlEl.className.split(" ")[0]}`
            : htmlEl.tagName.toLowerCase();
        }

        const box = htmlEl.getBoundingClientRect();
        const value =
          (htmlEl as HTMLInputElement).value ||
          (htmlEl as HTMLSelectElement).selectedOptions?.[0]?.textContent;

        elements.push({
          selector,
          role: (htmlEl as any).role || htmlEl.tagName.toLowerCase(),
          name:
            htmlEl.textContent?.substring(0, 100) ||
            htmlEl.getAttribute("aria-label") ||
            htmlEl.getAttribute("placeholder") ||
            "",
          value,
          box: {
            x: box.x,
            y: box.y,
            width: box.width,
            height: box.height,
            top: box.top,
            left: box.left,
            bottom: box.bottom,
            right: box.right,
            toJSON: () => ({
              x: box.x,
              y: box.y,
              width: box.width,
              height: box.height,
            }),
          },
        });
      }
    });

    return elements;
  });

  // Build element map
  const elementMap: Record<number, AnnotatedElement> = {};
  elementsWithBoxes.forEach((el, index) => {
    elementMap[index] = {
      id: index,
      selector: el.selector,
      role: el.role,
      name: el.name,
      value: el.value,
      x: el.box?.x || 0,
      y: el.box?.y || 0,
      width: el.box?.width || 0,
      height: el.box?.height || 0,
    };
  });

  // For now, return the base screenshot as-is
  // In a production implementation, you'd use image manipulation library (like Sharp)
  // to actually draw boxes on the image. For simplicity, we'll rely on the
  // JSON map being sent to the AI vision model.
  const fs = await import("fs");
  const annotatedImage = fs.readFileSync(screenshotPath);

  return {
    annotatedImage,
    elementMap,
  };
}

/**
 * Convert element map to a concise text representation for the AI
 */
export function formatElementMapForAI(
  elementMap: Record<number, AnnotatedElement>
): string {
  return Object.entries(elementMap)
    .map(
      ([id, el]) =>
        `[${id}] ${el.role}: "${el.name}"${el.value ? ` [value: ${el.value}]` : ""}`
    )
    .join("\n");
}
