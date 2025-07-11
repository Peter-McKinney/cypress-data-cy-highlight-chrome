function getAttributeValue(): string {
  const inputValue = (
    document.getElementById("custom-attribute-input") as HTMLInputElement
  )?.value;

  const attributeValue = inputValue || "data-cy";

  return attributeValue;
}

function exportFile(tagsOutput: string): void {
  const blob = new Blob([tagsOutput], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const filename = "data-cy-tags.html";

  chrome.downloads.download({
    url,
    filename,
    saveAs: true,
  });
}

document.getElementById("toggle-btn")?.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab.id) return;

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
    func: (attribute: string) => {
      window.cyDataCyHighlightElements(attribute);
    },
    args: [getAttributeValue()],
  });
});

document.getElementById("export-btn")?.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab.id) return;

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["exporter.js"],
  });

  const [{ result: tagsOutput }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (attribute: string) => {
      return window.cyDataCyExportElements(attribute);
    },
    args: [getAttributeValue()],
  });

  if (tagsOutput) {
    exportFile(tagsOutput);
  }
});

document
  .getElementById("html-panel-btn")
  ?.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab.id) return;

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
      func: (attribute: string) => {
        window.cyDataCyHtmlPanel(attribute);
      },
      args: [getAttributeValue()],
    });
  });
