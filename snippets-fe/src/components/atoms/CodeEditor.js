import React from "react";
import AceEditor from "react-ace";

const CodeEditor = ({ label, onChange }) => {
  return (
    <AceEditor
      name="UNIQUE_ID_OF_DIV"
      onChange={onChange}
      height="200px"
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      }}
    />
  );
};

export default CodeEditor;
