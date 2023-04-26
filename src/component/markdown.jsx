import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

function MarkdownEditor({ value, onChange }) {
  const handleEditorChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <textarea value={value} onChange={handleEditorChange} className="note-textarea" />
  );
}

function MarkdownPreview({ value }) {
  return (
    <ReactMarkdown
      source={value}
      className="note-textarea"
      allowDangerousHtml
      renderers={{
        code: CodeBlock,
      }}
    />
  );
}

function MarkdownEditorPreview({ value, onChange }) {
  return (
    <>
      <MarkdownEditor value={value} onChange={onChange} />
      <MarkdownPreview value={value} />
    </>
  );
}

export default MarkdownEditorPreview;
