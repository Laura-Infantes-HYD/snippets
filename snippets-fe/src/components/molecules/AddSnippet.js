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
    "C++",
    "JSON",
  ];

  const nameInputRef = useRef(null);
  const tagsFieldsetRef = useRef(null);
  const languageSelectRef = useRef(null);
  const formRef = useRef(null);

  const [snippet, setSnippet] = useState("");
  const [addSnippet] = useAddSnippetMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { value: name } = nameInputRef.current;
    const { value: language } = languageSelectRef.current;
    const checkedTags = [...tagsFieldsetRef.current.children].reduce(
      tagReducer,
      []
    );
    const snippetObject = { name, snippet, tags: checkedTags, language };

    addSnippet(snippetObject).then(() => {
      formRef.current.reset();
      setShowModal(false);
    });
  };

  const tagReducer = (arr, tag) => {
    tag.checked && arr.push(tag.value);
    return arr;
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <PositionToRight>
        <Button text="Add snippet" onClick={openModal} />
      </PositionToRight>

      {showModal && (
        <Modal closeModal={closeModal}>
          <form onSubmit={handleSubmit} ref={formRef}>
            <Input
              label="Name"
              placeholder="Give your snippet a name"
              forwardedRef={nameInputRef}
            />

            <CodeEditor label="Snippet" onChange={setSnippet} />

            <Select
              label="Choose a language"
              options={languages}
              forwardedRef={languageSelectRef}
            />

            <TagsSelector forwardedRef={tagsFieldsetRef} />

            <PositionToRight>
              <Button type="submit" text="Submit"></Button>
            </PositionToRight>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddSnippet;
