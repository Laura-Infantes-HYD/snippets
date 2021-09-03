import React, { useRef, useState } from "react";
import {
  useAddSnippetMutation,
  useGetLanguagesQuery,
  useUpdateSnippetMutation,
} from "../../services/snippets";
import Button from "../atoms/Button";
import CodeEditor from "../atoms/CodeEditor";
import Input from "../atoms/Input";
import { PositionToRight } from "../atoms/PositionToRight";
import Select from "../atoms/Select";
import Modal from "../organisms/Modal";
import TagsSelector from "../molecules/TagsSelector";

const AddSnippet = ({ show, action = "create", snippet }) => {
  const nameInputRef = useRef(null);
  const tagsFieldsetRef = useRef(null);
  const formRef = useRef(null);
  const [newSnippet, setNewSnippet] = useState(snippet?.snippet || "");
  const [language, setLanguage] = useState(snippet?.language || "html");
  const [addSnippet] = useAddSnippetMutation();
  const [updateSnippet] = useUpdateSnippetMutation();
  const { data: languages = [] } = useGetLanguagesQuery();

  const reset = () => {
    formRef.current.reset();
    show(false);
  };

  const getCheckedTags = () => {
    const tagsFieldChildren = [...tagsFieldsetRef.current.children];
    const checkedTags = tagsFieldChildren
      .filter((tag) => tag.checked)
      .map((tag) => tag.value);
    return checkedTags;
  };

  const buildSnippetFromInput = () => {
    const { value: name } = nameInputRef.current;

    return {
      name,
      snippet: newSnippet,
      tags: getCheckedTags(),
      language,
    };
  };

  const handleSubmit = (e) => {
    const snippetObject = buildSnippetFromInput();
    e.preventDefault();

    switch (action) {
      case "update":
        updateSnippet({ _id: snippet._id, ...snippetObject }).then(reset);
        break;
      case "create":
        addSnippet(snippetObject).then(reset);
        break;
    }
  };

  return (
    <>
      {
        <Modal
          closeModal={() => {
            show(false);
          }}
        >
          <form onSubmit={handleSubmit} ref={formRef}>
            <Input
              label="Name"
              placeholder="Give your snippet a name"
              forwardedRef={nameInputRef}
              defaultValue={snippet?.name || ""}
            />
            <Select
              label="Choose a language"
              options={languages}
              onChange={setLanguage}
              selected={language}
            />
            <CodeEditor
              label="Snippet"
              onChange={setNewSnippet}
              language={language}
              snippet={snippet?.snippet || ""}
            />
            <TagsSelector
              forwardedRef={tagsFieldsetRef}
              initiallySelected={snippet?.tags || []}
            />
            <PositionToRight>
              <Button btnType="ctaPrimary" type="submit" text="Submit"></Button>
            </PositionToRight>
          </form>
        </Modal>
      }
    </>
  );
};

export default AddSnippet;
