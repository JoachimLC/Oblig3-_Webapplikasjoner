import { ExperienceProps } from "./Types";

export default function Experience({ description }: ExperienceProps) {
  return <p className="list-item">{description}</p>;
}
