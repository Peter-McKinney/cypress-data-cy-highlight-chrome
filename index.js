document.getElementById("toggle-btn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["highlighter.js"],
  });
});

document.getElementById("export-btn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.scripting.executeScript({
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

      const joinedTags = tags.join("\n");
      console.log("Exporting data-cy tags");
      console.log(joinedTags);
      navigator.clipboard.writeText(joinedTags);
      return joinedTags;
    },
  });
});
