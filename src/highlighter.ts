window.cyDataCyHighlightElements = function (attribute: string): void {
  const LABEL_CLASS = "data-cy-label-floating";
  const ELEMENT_CLASS = "data-cy-highlight";

  const elementToLabelMap = new Map<Element, HTMLDivElement>();

  function createLabel(el: Element): void {
    const label = document.createElement("div");

    label.className = LABEL_CLASS;
    label.textContent = `${el.getAttribute(`${attribute}`)}`;

    document.body.appendChild(label);
    elementToLabelMap.set(el, label);

    positionLabel(el, label);
  }

  function positionLabel(el: Element, label: HTMLDivElement): void {
    const rect = el.getBoundingClientRect();
    label.style.position = "absolute";

    label.style.top = `${window.scrollY + rect.top - 20}px`;
    label.style.left = `${window.scrollX + rect.left}px`;
  }

  function updateAllLabelPositions(): void {
    elementToLabelMap.forEach((label, el) => {
      positionLabel(el, label);
    });
  }

  function highlightElement(el: Element): void {
    el.classList.add(ELEMENT_CLASS);
  }

  function unhighlightElement(el: Element): void {
    el.classList.remove("data-cy-highlight");
  }

  function tearDown(): void {
    document.body.dataset.cyHighlight = "false";
    window.removeEventListener("scroll", updateAllLabelPositions, true);
    window.removeEventListener("resize", updateAllLabelPositions);
  }

  function setup(): void {
    document.body.dataset.cyHighlight = "true";

    window.addEventListener("scroll", updateAllLabelPositions, true);
    window.addEventListener("resize", updateAllLabelPositions);
  }

  function toggleHighlight(toggleValue: boolean): void {
    if (toggleValue) {
      unhighlightDataCyElements();
    } else {
      highlightDataCyElements();
    }
  }

  function highlightDataCyElements(): void {
    const elements = document.querySelectorAll(`[${attribute}]`);
    if (elements?.length > 0) {
      elements.forEach((el) => {
        highlightElement(el);
        createLabel(el);
      });

      setup();
    }
  }

  function unhighlightDataCyElements(): void {
    const elements = document.querySelectorAll(`.${LABEL_CLASS}`);

    if (elements?.length > 0) {
      elements.forEach((el) => el.remove());
      document
        .querySelectorAll(`.${ELEMENT_CLASS}`)
        .forEach((el) => unhighlightElement(el));

      tearDown();
    }
  }

  const isHighlighted = document.body.dataset.cyHighlight === "true";
  toggleHighlight(isHighlighted);
};
