import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SubmitProject from "../SubmitProject";
import "@testing-library/jest-dom/vitest";

describe("SubmitProject Component", () => {
  const setProjectData = vi.fn();
  const setMediaData = vi.fn();

  beforeEach(() => {
    render(<SubmitProject setProjectData={setProjectData} setMediaData={setMediaData} />);
  });

  it("Should render all input fields", () => {
    expect(screen.getByLabelText(/Tittel:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Beskrivelse:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teknologier:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Link:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bilde-URL:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bildebeskrivelse:/i)).toBeInTheDocument();
   
  });

  it("Should render all buttons", () => {
    expect(screen.getByRole("button", { name: "Legg til teknologi" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Legg til" })).toBeInTheDocument();
   
  });

  it("Should add a technology when clicking the 'Legg til teknologi' button", () => {
    const newTechnologyInput = screen.getByLabelText(/Teknologier:/i);
    const addButton = screen.getByRole("button", { name: "Legg til teknologi" });

    fireEvent.change(newTechnologyInput, { target: { value: "TestTechnology" } });
    fireEvent.click(addButton);

    expect(screen.getByText("TestTechnology")).toBeInTheDocument();
  });

  it("Should trigger validation message for title when it is less than 3 characters long", () => {
    const titleInput = screen.getByLabelText(/Tittel:/i);
    fireEvent.change(titleInput, { target: { value: "Te" } });
    
    fireEvent.blur(titleInput);

    expect(screen.getByText(/Tittelen må være minst 3 tegn lang/i)).toBeInTheDocument();
  });

  it("Should not allow form submission if not all fields are filled out", () => {
    fireEvent.change(screen.getByLabelText(/Tittel:/i), { target: { value: "Test Project" } });
    fireEvent.change(screen.getByLabelText(/Beskrivelse:/i), { target: { value: "Only one field filled" } });

    const submitButton = screen.getByRole("button", { name: "Legg til" });
    fireEvent.click(submitButton);
    
    expect(setProjectData).not.toHaveBeenCalled();
    expect(setMediaData).not.toHaveBeenCalled();
  });

  
  it("Should add 5 technologies and then be able to remove 4 of them", () => {

    const newTechnologyInput = screen.getByLabelText(/Teknologier:/i);
    const addTechnologyButton = screen.getByRole("button", { name: "Legg til teknologi" });

    const technologies = ["React", "Node.js", "TypeScript", "Python", "Java"];

    technologies.forEach((tech) => {
      fireEvent.change(newTechnologyInput, { target: { value: tech } });
      fireEvent.click(addTechnologyButton);
    });

    let technologyItems = screen.getAllByRole("listitem");
    expect(technologyItems.length).toBe(5);
    technologies.forEach((tech, index) => {
      expect(technologyItems[index]).toHaveTextContent(tech);
    });

    for (let i = 0; i < 4; i++) {
      const removeButton = screen.getAllByRole("button", { name: "Fjern" })[0];
      fireEvent.click(removeButton);
    }

    technologyItems = screen.getAllByRole("listitem");
    expect(technologyItems.length).toBe(1);
    expect(technologyItems[0]).toHaveTextContent("Java");
  });


  
});
