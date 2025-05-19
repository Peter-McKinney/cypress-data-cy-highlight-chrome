window.cyDataCyExportElements = function (attribute) {
  const elements = document.querySelectorAll(`[${attribute}]`);
  const tags = Array.from(elements).map((el) => {
    const tagName = el.tagName.toLowerCase();
    const attrs = Array.from(el.attributes)
      .filter((attr) => attr.name === `${attribute}`)
      .map((attr) => `${attr.name}="${attr.value}"`)
      .join(" ");
    return `<${tagName} ${attrs}></${tagName}>`;
  });

  return tags.join("\n");
};
