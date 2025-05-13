function exportDataCyTags() {
  const elements = document.querySelectorAll("[data-cy]");
  const tags = Array.from(elements).map((el) => {
    const tagName = el.tagName.toLowerCase();

    const attrs = Array.from(el.attributes)
      .filter((attr) => attr.name === "data-cy")
      .map((attr) => `${attr.name}="${attr.value}`)
      .join(" ");

    return `<${tagName} ${attrs}></${tagName}>`;
  });

  const output = tags.join("\n");
  return output;
}

exportDataCyTags;
