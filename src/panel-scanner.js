window.cyDataCyPanelScanner = function (attribute) {
  function scanElements() {
    const elements = document.querySelectorAll(`[${attribute}]`);
    const elementData = [];

    elements.forEach((element) => {
      const tagName = element.tagName.toLowerCase();
      const attributes = {};

      // Collect all attributes
      for (let attr of element.attributes) {
        attributes[attr.name] = attr.value;
      }

      elementData.push({
        tagName,
        attributes,
      });
    });

    return elementData;
  }

  return scanElements();
};

window.cyDataCySetupMutationObserver = function (attribute, callback) {
  // Remove existing observer if any
  if (window.cyDataCyObserver) {
    window.cyDataCyObserver.disconnect();
  }

  // Create new observer
  window.cyDataCyObserver = new MutationObserver((mutations) => {
    let shouldUpdate = false;

    mutations.forEach((mutation) => {
      // Check if nodes were added or removed
      if (mutation.type === "childList") {
        // Check added nodes
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.hasAttribute && node.hasAttribute(attribute)) {
              shouldUpdate = true;
            }
            // Check descendants
            if (
              node.querySelectorAll &&
              node.querySelectorAll(`[${attribute}]`).length > 0
            ) {
              shouldUpdate = true;
            }
          }
        });

        // Check removed nodes
        mutation.removedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.hasAttribute && node.hasAttribute(attribute)) {
              shouldUpdate = true;
            }
            // Check descendants
            if (
              node.querySelectorAll &&
              node.querySelectorAll(`[${attribute}]`).length > 0
            ) {
              shouldUpdate = true;
            }
          }
        });
      }

      // Check if attributes were modified
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === attribute
      ) {
        shouldUpdate = true;
      }
    });

    if (shouldUpdate) {
      callback();
    }
  });

  // Start observing
  window.cyDataCyObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [attribute],
  });
};

window.cyDataCyStopMutationObserver = function () {
  if (window.cyDataCyObserver) {
    window.cyDataCyObserver.disconnect();
    window.cyDataCyObserver = null;
  }
};
