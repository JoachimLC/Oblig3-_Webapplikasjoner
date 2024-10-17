import { FormEvent } from "react";
import { submitProjectProps } from "./Types";
import { useSubmitProjectState } from "../Hooks/useSubmitProjectState"; 
import { validateTitle, validateDescription, updateField, generateNewProject } from "../helpers/projectSubmissionHelper";
import { createProject } from "../Services/api";

export default function SubmitProject({ setProjectData, setMediaData }: submitProjectProps) {
  const {
    title, setTitle, titleValid, setTitleValid, titleIsDirty,
    setTitleIsDirty, titleIsTouched, setTitleIsTouched,
    description, setDescription, descriptionValid, setDescriptionValid, setDescriptionIsDirty, descriptionIsTouched, setDescriptionIsTouched, 
    technologies, addTechnology, removeTechnology, newTechnology, setNewTechnology, link, setLink, imageUrl, setImageUrl, imageDescription, setImageDescription, published,
    setPublished, resetForm, validateFields
  } = useSubmitProjectState();

  const addProjectToListOfProjects = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateFields()) return;
  
    const dateMade = new Date().toISOString().split('T')[0];
  
    const newMediaItem = {
      media_id: crypto.randomUUID(),
      media_type: "image",
      media_url: imageUrl,
      media_description: imageDescription,
    };
  
    const newProject = generateNewProject(
      published,
      title,
      description,
      technologies,
      link,
      dateMade,
      newMediaItem.media_id
    );
  
    try {
      await createProject(newProject, newMediaItem);
      setProjectData((prevProjects) => [...prevProjects, newProject]);
      setMediaData((prevMedia) => [...prevMedia, newMediaItem]);
      resetForm();
      console.log("Project added successfully!");
  } catch (error) {
      console.error("An error occurred:", error);
  }
};
  

  return (
    <section className="componentcard">
      <h2>Legg til et nytt prosjekt</h2>
      <form onSubmit={addProjectToListOfProjects}>
        <label htmlFor="title">
            <p>Tittel:</p>
            <input
                type="text"
                id="title"
                name="title"
                onChange={(e) =>
                    updateField(e, "title", setTitle, setTitleValid, (val) => validateTitle(val, titleIsTouched, titleIsDirty))
                }
                onFocus={() => setTitleIsTouched(true)}
                onBlur={() => setTitleIsDirty(true)}
                value={title}
                placeholder="title"
            />
            {!titleValid && titleIsDirty && <p className="warning">Tittelen må være minst 3 tegn lang</p>}
       </label>


        <label htmlFor="description">
            <p>Beskrivelse :</p>
            <input
                type="text"
                id="description"
                name="description"
                onChange={(e) =>
                    updateField(e, "description", setDescription, setDescriptionValid, validateDescription)
                }
                onBlur={() => setDescriptionIsDirty(true)}
                onFocus={() => setDescriptionIsTouched(true)}
                value={description}
                placeholder="description"

            />
            {!descriptionValid && descriptionIsTouched && <p className="warning">Beskrivelsen må inneholde minst to ord</p>}
        </label>

        <label htmlFor="newTechnology">
          <p>Teknologier:</p>
          <input
            type="text"
            id="newTechnology"
            name="newTechnology"
            onChange={(e) => setNewTechnology(e.currentTarget.value)}
            value={newTechnology}
            placeholder="React"

          />
          <button type="button" className="submitbutton" onClick={addTechnology}>Legg til teknologi</button>
          <ul>
            {technologies.map((tech, index) => (
              <li key={index}>
                {tech}
                <button type="button" onClick={() => removeTechnology(tech)}>Fjern</button>
              </li>
            ))}
          </ul>
        </label>

        <label htmlFor="link">
          <p>Link:</p>
          <input
            type="text"
            id="link"
            name="link"
            onChange={(e) => setLink(e.currentTarget.value)}
            value={link}
            placeholder="http://link.com"

          />
        </label>

    

        <label htmlFor="imageUrl">
          <p>Bilde-URL:</p>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.currentTarget.value)}
            placeholder="http://imageurl.com/img.jpg"

          />
        </label>

        <label htmlFor="imageDescription">
          <p>Bildebeskrivelse:</p>
          <input
            type="text"
            id="imageDescription"
            name="imageDescription"
            value={imageDescription}
            onChange={(e) => setImageDescription(e.currentTarget.value)}
            placeholder="Image description"

          />
        </label>

        <fieldset>
          <legend>Skal prosjektet være publisert?</legend>
          <label>
            <input
              type="radio"
              value="true"
              checked={published}
              onChange={() => setPublished(true)}
            />
            Ja
          </label>
          <label>
            <input
              type="radio"
              value="false"
              checked={!published}
              onChange={() => setPublished(false)}
            />
            Nei
          </label>
        </fieldset>

        <button type="submit" className="submitbutton">Legg til</button>
      </form>
    </section>
  );
}
