import React from "react";

const StringToHtmlConverter = ({ content, "tag-name": TagName = "div" }) => {
    const html = content
    .replaceAll(/</g, '&lt;')
    .replaceAll(/>/g, '&gt;')
    .replaceAll(
      // Replace double newline characters with <p> tags
      /(\n\n|^)([^]*?)(?=\n\n|$)/g,
      "<p>$2</p>" // \n are optional for more visible formatting
    )
    .replaceAll(
      // Replace single newline characters with <br> tags
      /(\n|^)([^]*?)(?=\n|$)/g,
      "$2<br>"
    )
    .replaceAll(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
    .replaceAll(/ /g, '&nbsp;');

  return (
    <TagName data-component="StringToHtmlConverter" dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default StringToHtmlConverter;
