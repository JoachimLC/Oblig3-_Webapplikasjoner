import { useState } from "react";
import { validateTitle, validateDescription } from "../helpers/projectSubmissionHelper";

export function useSubmitProjectState() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [newTechnology, setNewTechnology] = useState("");
  const [link, setLink] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [imageDescription, setImageDescription] = useState("");

  const [published, setPublished] = useState(false);


  const [titleValid, setTitleValid] = useState(false);
  const [titleIsDirty, setTitleIsDirty] = useState(false);
  const [titleIsTouched, setTitleIsTouched] = useState(false);

  const [descriptionValid, setDescriptionValid] = useState(false);
  const [descriptionIsDirty, setDescriptionIsDirty] = useState(false);
  const [descriptionIsTouched, setDescriptionIsTouched] = useState(false);

  const addTechnology = () => {
    if (newTechnology.trim() && !technologies.includes(newTechnology)) {
      setTechnologies([...technologies, newTechnology]);
      setNewTechnology("");
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTechnologies([]);
    setNewTechnology("");
    setLink("");
    setImageUrl(""); 
    setImageDescription("");
    setPublished(false);
    setTitleIsDirty(false);
    setTitleIsTouched(false);
    setTitleValid(false);
    setDescriptionIsDirty(false);
    setDescriptionIsTouched(false);
    setDescriptionValid(false);
  };

  const validateFields = () => {
    const isTitleValid = validateTitle(title, titleIsTouched, titleIsDirty);
    const isDescriptionValid = validateDescription(description);
    setTitleValid(isTitleValid);
    setDescriptionValid(isDescriptionValid);
    return isTitleValid && isDescriptionValid;
  };

  return {
    title,
    setTitle,
    titleValid,
    setTitleValid,
    titleIsDirty,
    setTitleIsDirty,
    titleIsTouched,
    setTitleIsTouched,
    description,
    setDescription,
    descriptionValid,
    setDescriptionValid,
    descriptionIsDirty,
    setDescriptionIsDirty,
    descriptionIsTouched,
    setDescriptionIsTouched,
    technologies,
    addTechnology,
    removeTechnology,
    newTechnology,
    setNewTechnology,
    link,
    setLink,
    imageUrl,
    setImageUrl, 
    imageDescription, 
    setImageDescription, 
    published,
    setPublished,
    resetForm,
    validateFields
  };
}
