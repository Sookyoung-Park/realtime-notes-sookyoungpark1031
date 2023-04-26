import React from 'react';

function CodeBlock(props) {
  return <pre><code className={`language-${props.language}`}>{props.value}</code></pre>;
}

export default CodeBlock;
