import React, { useRef, useState } from "react";
import { useAddSnippetMutation } from "../../services/snippets";
import Button from "../atoms/Button";
import CodeEditor from "../atoms/CodeEditor";
import Input from "../atoms/Input";
import { PositionToRight } from "../atoms/PositionToRight";
import Select from "../atoms/Select";
import Modal from "../organisms/Modal";
import TagsSelector from "./TagsSelector";

const AddSnippet = () => {
  const languages = [
    "HTML",
    "JavaScript",
    "PHP",
    "Typescript",
    "Python",
    "JSON",
    "java",
  ];

  const nameInputRef = useRef(null);
  const tagsFieldsetRef = useRef(null);
  const formRef = useRef(null);

  const [snippet, setSnippet] = useState("");
  const [addSnippet] = useAddSnippetMutation();
  const [language, setLanguage] = useState("html");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { value: name } = nameInputRef.current;
    const tagsFieldChildren = [...tagsFieldsetRef.current.children];
    const checkedTags = tagsFieldChildren.reduce(tagReducer, []);
    const snippetObject = { name, snippet, tags: checkedTags, language };
    console.log("snippetObject: ", snippetObject);

    addSnippet(snippetObject).then(() => {
      formRef.current.reset();
      setShowModal(false);
    });
  };

  const tagReducer = (arr, tag) => {
    tag.checked && arr.push(tag.value);
    return arr;
  };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <PositionToRight>
        <Button btnType="ctaPrimary" text="Add snippet" onClick={openModal} />
      </PositionToRight>

      {showModal && (
        <Modal closeModal={closeModal}>
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
