import { useState, useEffect } from "react";
import { ProjectsProps } from "./Types";

export default function ProjectsPerTechnology({ projects }: ProjectsProps) {
  const [technologies, setTechnologies] = useState<{ technology: string; timesUsed: number }[]>([]);

  const addTechnology = (technologyToAdd: string) => {
    setTechnologies((prevTechnologies) => {
      const existingTechnology = prevTechnologies.find((t) => t.technology === technologyToAdd);

      if (existingTechnology) {
        return prevTechnologies.map((t) => {
          if (t.technology === technologyToAdd) {
            return { ...t, timesUsed: t.timesUsed + 1 };
          } else {
            return t;
          }
        });
      } else {
        
        return [...prevTechnologies, { technology: technologyToAdd, timesUsed: 1 }];
      }
    });
  }

  const addData = () => {
    projects.forEach((project) => {
      project.technologies.forEach((technology) => {
        addTechnology(technology);
      });
    });
  };

  useEffect(() => {
    setTechnologies([]);
    addData();
  }, [projects]);


  return (
    <aside >
      <h2>Antall Ganger Teknologi Er Brukt</h2>
      <ul className="list">
        {technologies.map((tech) => (
          <li key={tech.technology} className="list-item">
            {tech.technology}: {tech.timesUsed}
          </li>
        ))}
      </ul>
    </aside>
  );
}
