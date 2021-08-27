import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const CodeEditor = ({ onChange, language, snippet }) => {
  return (
    <AceEditor
      placeholder="Type or paste your code"
      mode={language ? language.toLowerCase() : "html"}
      theme="monokai"
      onChange={onChange}
      fontSize={14}
      height="200px"
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      defaultValue={snippet}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

export default CodeEditor;
