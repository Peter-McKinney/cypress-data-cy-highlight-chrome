window.cyDataCyHtmlPanel = function (attribute) {
  const PANEL_ID = "data-cy-html-panel";
  const HOVER_HIGHLIGHT_CLASS = "data-cy-hover-highlight";

  function createPanel() {
    // Remove existing panel if it exists
    const existingPanel = document.getElementById(PANEL_ID);
    if (existingPanel) {
      existingPanel.remove();
      // Also remove any hover highlights
      document
        .querySelectorAll(`.${HOVER_HIGHLIGHT_CLASS}`)
        .forEach((el) => el.classList.remove(HOVER_HIGHLIGHT_CLASS));
      return;
    }

    const panel = document.createElement("div");
    panel.id = PANEL_ID;
    panel.className = "data-cy-html-panel";

    // Panel header
    const header = document.createElement("div");
    header.className = "data-cy-panel-header";
    header.innerHTML = `
      <span>HTML Elements with ${attribute} attributes</span>
      <button class="data-cy-panel-close">×</button>
    `;

    // Panel content
    const content = document.createElement("div");
    content.className = "data-cy-panel-content";

    // Get all elements with the specified attribute
    const elements = document.querySelectorAll(`[${attribute}]`);

    if (elements.length === 0) {
      content.innerHTML = `<p>No elements found with ${attribute} attribute</p>`;
    } else {
      // Create formatted HTML for each element
      const htmlList = document.createElement("div");
      htmlList.className = "data-cy-html-list";

      elements.forEach((el, index) => {
        const htmlItem = document.createElement("div");
        htmlItem.className = "data-cy-html-item";
        htmlItem.dataset.elementIndex = index;

        // Get all attributes of the element
        const attrs = Array.from(el.attributes)
          .map((attr) => `${attr.name}="${attr.value}"`)
          .join(" ");

        const tagName = el.tagName.toLowerCase();
        const formattedHtml = `&lt;${tagName} ${attrs}&gt;&lt;/${tagName}&gt;`;

        htmlItem.innerHTML = `<code>${formattedHtml}</code>`;

        // Add hover functionality
        htmlItem.addEventListener("mouseenter", () => {
          // Remove previous hover highlights
          document
            .querySelectorAll(`.${HOVER_HIGHLIGHT_CLASS}`)
            .forEach((highlightedEl) =>
              highlightedEl.classList.remove(HOVER_HIGHLIGHT_CLASS),
            );
          // Add highlight to current element
          el.classList.add(HOVER_HIGHLIGHT_CLASS);
        });

        htmlItem.addEventListener("mouseleave", () => {
          el.classList.remove(HOVER_HIGHLIGHT_CLASS);
        });

        htmlList.appendChild(htmlItem);
      });

      content.appendChild(htmlList);
    }

    panel.appendChild(header);
    panel.appendChild(content);

    // Add close functionality
    const closeBtn = header.querySelector(".data-cy-panel-close");
    closeBtn.addEventListener("click", () => {
      panel.remove();
      // Remove any hover highlights when panel is closed
      document
        .querySelectorAll(`.${HOVER_HIGHLIGHT_CLASS}`)
        .forEach((el) => el.classList.remove(HOVER_HIGHLIGHT_CLASS));
    });

    // Add panel to document
    document.body.appendChild(panel);
  }

  createPanel();
};
