function getAttributeValue() {
  const inputValue = document.getElementById("custom-attribute-input")?.value;

  const attributeValue = inputValue || "data-cy";

  return attributeValue;
}

function exportFile(tagsOutput) {
  const blob = new Blob([tagsOutput], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const filename = "data-cy-tags.html";

  chrome.downloads.download({
    url,
    filename,
    saveAs: true,
  });
}

function renderElementsPanel(elements) {
  const panel = document.getElementById("elements-panel");

  if (!elements || elements.length === 0) {
    panel.innerHTML =
      '<div class="no-elements-message">No elements found with the specified attribute.</div>';
    return;
  }

  const elementsHtml = elements
    .map((element, index) => {
      const attributesHtml = Object.entries(element.attributes)
        .map(
          ([name, value]) =>
            `<div class="attribute-item"><span class="attribute-name">${name}</span>=<span class="attribute-value">"${value}"</span></div>`,
        )
        .join("");

      return `
      <div class="element-item">
        <div class="element-tag">&lt;${element.tagName}&gt;</div>
        <div class="element-attributes">
          ${attributesHtml}
        </div>
      </div>
    `;
    })
    .join("");

  panel.innerHTML = elementsHtml;
}

async function refreshElementsPanel() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["panel-scanner.js"],
    });

    const [{ result: elements }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (attribute) => {
        return window.cyDataCyPanelScanner(attribute);
      },
      args: [getAttributeValue()],
    });

    renderElementsPanel(elements);

    // Set up mutation observer for dynamic updates
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (attribute) => {
        window.cyDataCySetupMutationObserver(attribute, () => {
          // This will trigger when DOM changes
          console.log(
            "DOM changed, elements with",
            attribute,
            "may have changed",
          );
        });
      },
      args: [getAttributeValue()],
    });
  } catch (error) {
    console.error("Error refreshing elements panel:", error);
    const panel = document.getElementById("elements-panel");
    panel.innerHTML =
      '<div class="no-elements-message">Error scanning page. Make sure you\'re on a valid web page.</div>';
  }
}

document.getElementById("toggle-btn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  await chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["styles.css"],
  });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["highlighter.js"],
  });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (attribute) => {
      window.cyDataCyHighlightElements(attribute);
    },
    args: [getAttributeValue()],
  });
});

document.getElementById("export-btn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["exporter.js"],
  });

  const [{ result: tagsOutput }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (attribute) => {
      return window.cyDataCyExportElements(attribute);
    },
    args: [getAttributeValue()],
  });

  exportFile(tagsOutput);
});

document
  .getElementById("refresh-panel-btn")
  .addEventListener("click", refreshElementsPanel);

// Auto-refresh panel when the popup is opened
document.addEventListener("DOMContentLoaded", () => {
  refreshElementsPanel();
});
