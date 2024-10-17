import { describe, it, expect } from "vitest";
import { toDb } from "./mappers";
import type { Project } from "../types/types";

describe('toDb', () => {
  it('should convert a project object to a DbProject object', () => {

    const project: Project = {
      id: "123",
      published: true,
      title: "Test Project",
      description: "A test project for validation",
      technologies: ["React", "TypeScript"],
      link: "https://example.com",
      dateMade: "2024-10-14",
      mediaId: "m1",
    };


    const result = toDb(project);

    expect(result).toEqual({
      id: "123",
      published: 1,
      title: "Test Project",
      description: "A test project for validation",
      technologies: "React,TypeScript",
      link: "https://example.com",
      dateMade: "2024-10-14",
      mediaId: "m1",
    });
  });

  it('should join technologies array to a comma separated string', () => {

    const project: Project = {
      id: "125",
      published: true,
      title: "Tech Project",
      description: "Testing technologies formatting",
      technologies: ["React", "TypeScript"],
      link: "https://example.com",
      dateMade: "2024-12-01",
      mediaId: "m3",
    };

   
    const result = toDb(project);

    expect(result.technologies).toBe("React,TypeScript"); 
  });

  it('should handle an empty technologies array', () => {

    const project: Project = {
      id: "126",
      published: true,
      title: "Project With Empty Technologies",
      description: "no technologies specified",
      technologies: [],
      link: "https://example.com",
      dateMade: "2024-12-02",
      mediaId: "m4",
    };

    const result = toDb(project);


    expect(result.technologies).toBe("");
  });

  it('should handle null mediaId', () => {
  
    const projectWithNullMedia: Project = {
      id: "127",
      published: true,
      title: "Null Media Project",
      description: "project with null media",
      technologies: ["Node.js"],
      link: "https://example.com",
      dateMade: "2024-12-03",
      mediaId: null, 
    };

    


    const resultWithNull = toDb(projectWithNullMedia);


    expect(resultWithNull.mediaId).toBeNull();
  });
});
