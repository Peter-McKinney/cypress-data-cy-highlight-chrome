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
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: exportDataCyTags,
  });

  console.log(`data-cy - Exported output`);
  console.log(output);
  await navigator.clipboard.writeText(result);
  console.log("copied to clipboard");
});
