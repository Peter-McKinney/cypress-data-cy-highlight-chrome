window.cyDataCyHtmlPanel = function (attribute) {
  const PANEL_ID = "data-cy-html-panel";
  const HOVER_HIGHLIGHT_CLASS = "data-cy-highlight";

  function getElements() {
    const elements = document.querySelectorAll(`[${attribute}]`);

    return elements;
  }

  function removeHoverHighlights() {
    document
      .querySelectorAll(`.${HOVER_HIGHLIGHT_CLASS}`)
      .forEach((el) => el.classList.remove(HOVER_HIGHLIGHT_CLASS));
  }

  function removePanel() {
    const existingPanel = document.getElementById(PANEL_ID);
    if (existingPanel) {
      existingPanel.remove();
      removeHoverHighlights();
      return true;
    }

    return false;
  }

  function createPanelHeader() {
    const header = document.createElement("div");
    header.className = "data-cy-panel-header";
    header.innerHTML = `
      <span>HTML Elements with ${attribute} attributes</span>
      <button class="data-cy-panel-close">×</button>
    `;

    return header;
  }

  function createPanelContent() {
    const content = document.createElement("div");
    content.className = "data-cy-panel-content";

    return content;
  }

  function createHtmlList() {
    const htmlList = document.createElement("div");
    htmlList.className = "data-cy-html-list";

    return htmlList;
  }

  function createHtmlItem(index) {
    const htmlItem = document.createElement("div");
    htmlItem.className = "data-cy-html-item";
    htmlItem.dataset.elementIndex = index;

    return htmlItem;
  }

  function getAllAttributes(el) {
    const attrs = Array.from(el.attributes)
      .map((attr) => `${attr.name}="${attr.value}"`)
      .join(" ");

    return attrs;
  }

  function createFormattedHtml(el, attrs) {
    const tagName = el.tagName.toLowerCase();
    const formattedHtml = `&lt;${tagName} ${attrs}&gt;&lt;/${tagName}&gt;`;

    return `<code>${formattedHtml}</code>`;
  }

  function positionLabel(el, label) {
    const rect = el.getBoundingClientRect();

    label.style.position = "absolute";
    label.style.top = `${window.scrollY + rect.top - 20}px`;
    label.style.left = `${window.scrollX + rect.left}px`;
  }

  function addListeners(htmlItem, el) {
    htmlItem.addEventListener("mouseenter", () => {
      document
        .querySelectorAll(`.${HOVER_HIGHLIGHT_CLASS}`)
        .forEach((highlightedEl) =>
          highlightedEl.classList.remove(HOVER_HIGHLIGHT_CLASS),
        );

      el.classList.add(HOVER_HIGHLIGHT_CLASS);

      const label = document.createElement("div");
      label.className = "data-cy-label-floating";
      label.textContent = el.getAttribute(attribute);

      document.body.appendChild(label);
      positionLabel(el, label);
    });

    htmlItem.addEventListener("mouseleave", () => {
      el.classList.remove(HOVER_HIGHLIGHT_CLASS);

      document.querySelectorAll(".data-cy-label-floating").forEach((label) => {
        label.remove();
      });
    });
  }

  function createCloseButton(header, panel) {
    const closeBtn = header.querySelector(".data-cy-panel-close");
    closeBtn.addEventListener("click", () => {
      panel.remove();

      document
        .querySelectorAll(`.${HOVER_HIGHLIGHT_CLASS}`)
        .forEach((el) => el.classList.remove(HOVER_HIGHLIGHT_CLASS));
    });
  }

  function createPanel() {
    const existingPanel = removePanel();
    if (existingPanel) {
      return;
    }

    const panel = document.createElement("div");
    panel.id = PANEL_ID;
    panel.className = "data-cy-html-panel";

    const header = createPanelHeader();
    const content = createPanelContent();

    const elements = getElements();

    if (elements.length === 0) {
      content.innerHTML = `<p>No elements found with ${attribute} attribute</p>`;
    } else {
      const htmlList = createHtmlList();

      elements.forEach((el, index) => {
        const htmlItem = createHtmlItem(index);
        const attrs = getAllAttributes(el);

        htmlItem.innerHTML = createFormattedHtml(el, attrs);

        addListeners(htmlItem, el);

        htmlList.appendChild(htmlItem);
      });

      content.appendChild(htmlList);
    }

    panel.appendChild(header);
    panel.appendChild(content);

    createCloseButton(header, panel);

    document.body.appendChild(panel);
  }

  createPanel();
};
