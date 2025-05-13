(() => {
  const LABEL_CLASS = "data-cy-label-floating";
  const ELEMENT_CLASS = "data-cy-highlight";

  const elementToLabelMap = new Map();

  function createLabel(el) {
    const label = document.createElement("div");

    label.className = LABEL_CLASS;
    label.textContent = `${el.getAttribute("data-cy")}`;

    document.body.appendChild(label);
    elementToLabelMap.set(el, label);

    positionLabel(el, label);
  }

  function positionLabel(el, label) {
    const rect = el.getBoundingClientRect();
    label.style.position = "absolute";

    label.style.top = `${window.scrollY + rect.top - 20}px`;
    label.style.left = `${window.scrollX + rect.left}px`;
  }

  function updateAllLabelPositions() {
    elementToLabelMap.forEach((label, el) => {
      positionLabel(el, label);
    });
  }

  function highlightElement(el) {
    el.classList.add(ELEMENT_CLASS);
  }

  function unhighlightElement(el) {
    el.classList.remove("data-cy-highlight");
  }

  function tearDown() {
    document.body.dataset.cyHighlight = "false";
    window.removeEventListener("scroll", updateAllLabelPositions, true);
    window.removeEventListener("resize", updateAllLabelPositions);
  }

  function setup() {
    document.body.dataset.cyHighlight = "true";

    window.addEventListener("scroll", updateAllLabelPositions, true);
    window.addEventListener("resize", updateAllLabelPositions);
  }

  function toggleHighlight(toggleValue) {
    if (toggleValue) {
      unhighlightDataCyElements();
    } else {
      highlightDataCyElements();
    }
  }

  function highlightDataCyElements() {
    const elements = document.querySelectorAll("[data-cy]");
    elements.forEach((el) => {
      highlightElement(el);
      createLabel(el);
    });

    setup();
  }

  function unhighlightDataCyElements() {
    document.querySelectorAll(`.${LABEL_CLASS}`).forEach((el) => el.remove());
    document
      .querySelectorAll(`.${ELEMENT_CLASS}`)
      .forEach((el) => unhighlightElement(el));

    tearDown();
  }

  const isHighlighted = document.body.dataset.cyHighlight === "true";
  toggleHighlight(isHighlighted);
})();
