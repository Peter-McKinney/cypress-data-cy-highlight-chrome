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
  .getElementById("html-panel-btn")
  .addEventListener("click", async () => {
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
      files: ["html-panel.js"],
    });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (attribute) => {
        window.cyDataCyHtmlPanel(attribute);
      },
      args: [getAttributeValue()],
    });
  });
