document.getElementById("toggle-btn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  await chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["styles.css"],
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["highlighter.js"],
  });
});

document.getElementById("export-btn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const [{ result: tagsOutput }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const elements = document.querySelectorAll("[data-cy]");
      const tags = Array.from(elements).map((el) => {
        const tagName = el.tagName.toLowerCase();
        const attrs = Array.from(el.attributes)
          .filter((attr) => attr.name === "data-cy")
          .map((attr) => `${attr.name}="${attr.value}"`)
          .join(" ");
        return `<${tagName} ${attrs}></${tagName}>`;
      });
      return tags.join("\n");
    },
  });

  const blob = new Blob([tagsOutput], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const filename = "data-cy-tags.html";

  chrome.downloads.download({
    url,
    filename,
    saveAs: true,
  });
});
