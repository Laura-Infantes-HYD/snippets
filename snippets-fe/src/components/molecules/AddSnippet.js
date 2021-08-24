import React, { useRef, useState } from "react";
import {
  useAddSnippetMutation,
  useGetLanguagesQuery,
} from "../../services/snippets";
import Button from "../atoms/Button";
import CodeEditor from "../atoms/CodeEditor";
import Input from "../atoms/Input";
import { PositionToRight } from "../atoms/PositionToRight";
import Select from "../atoms/Select";
import Modal from "../organisms/Modal";
import TagsSelector from "./TagsSelector";

const AddSnippet = () => {
  const nameInputRef = useRef(null);
  const tagsFieldsetRef = useRef(null);
  const formRef = useRef(null);

  const [snippet, setSnippet] = useState("");
  const [language, setLanguage] = useState("html");
  const [showModal, setShowModal] = useState(false);

  const [addSnippet] = useAddSnippetMutation();
  const { data: languages = [] } = useGetLanguagesQuery();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { value: name } = nameInputRef.current;
    const tagsFieldChildren = [...tagsFieldsetRef.current.children];
    const reduceTags = (arr, tag) => {
      tag.checked && arr.push(tag.value);
      return arr;
    };
    const checkedTags = tagsFieldChildren.reduce(reduceTags, []);
    const snippetObject = { name, snippet, tags: checkedTags, language };

    addSnippet(snippetObject).then(() => {
      formRef.current.reset();
      setShowModal(false);
    });
  };

  return (
    <>
      <PositionToRight>
        <Button
          btnType="ctaPrimary"
          text="Add snippet"
          onClick={() => {
            setShowModal(true);
          }}
        />
      </PositionToRight>

      {showModal && (
        <Modal
          closeModal={() => {
            setShowModal(false);
          }}
        >
          <form onSubmit={handleSubmit} ref={formRef}>
            <Input
              label="Name"
              placeholder="Give your snippet a name"
              forwardedRef={nameInputRef}
            />

            <Select
              label="Choose a language"
              options={languages}
              onChange={setLanguage}
            />

            <CodeEditor
              label="Snippet"
              onChange={setSnippet}
              language={language}
            />

            <TagsSelector forwardedRef={tagsFieldsetRef} />

            <PositionToRight>
              <Button btnType="ctaPrimary" type="submit" text="Submit"></Button>
            </PositionToRight>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddSnippet;
